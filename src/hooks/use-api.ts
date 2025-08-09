import { useState, useCallback, useRef } from 'react';
import { ApiError } from '../lib/api-client';
import { ERROR_MESSAGES } from '../lib/constants';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  cache?: boolean;
  cacheDuration?: number;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, { data: T; timestamp: number; expiresAt: number }>>(new Map());

  const execute = useCallback(
    async (apiCall: () => Promise<T>, cacheKey?: string): Promise<T | null> => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Check cache first
      if (options.cache && cacheKey) {
        const cached = cacheRef.current.get(cacheKey);
        if (cached && Date.now() < cached.expiresAt) {
          setState(prev => ({ ...prev, data: cached.data, loading: false, error: null }));
          options.onSuccess?.(cached.data);
          return cached.data;
        }
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiCall();

        // Cache the result
        if (options.cache && cacheKey) {
          const expiresAt = Date.now() + (options.cacheDuration || 5 * 60 * 1000); // 5 minutes default
          cacheRef.current.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
            expiresAt,
          });
        }

        setState(prev => ({ ...prev, data: result, loading: false, error: null }));
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            // Request was cancelled, don't update state
            return null;
          }

          if (error instanceof ApiError) {
            errorMessage = error.error.message;
          } else {
            errorMessage = error.message || ERROR_MESSAGES.NETWORK_ERROR;
          }
        }

        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
        options.onError?.(errorMessage);
        return null;
      }
    },
    [options]
  );

  const clearCache = useCallback((cacheKey?: string) => {
    if (cacheKey) {
      cacheRef.current.delete(cacheKey);
    } else {
      cacheRef.current.clear();
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    ...state,
    execute,
    clearCache,
    cancel,
    reset,
  };
}

// Specialized hooks for common API patterns
export function useApiGet<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>(options);

  const get = useCallback(
    async (url: string, requestOptions?: RequestInit, cacheKey?: string) => {
      return api.execute(
        async () => {
          const response = await fetch(url, {
            ...requestOptions,
            signal: api.cancel ? undefined : new AbortController().signal,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError({
              success: false,
              error: {
                code: errorData.error?.code || `HTTP_${response.status}`,
                message: errorData.error?.message || 'Request failed',
                details: errorData.error?.details,
              },
              timestamp: new Date().toISOString(),
            });
          }

          return response.json();
        },
        cacheKey || url
      );
    },
    [api]
  );

  return {
    ...api,
    get,
  };
}

export function useApiPost<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>(options);

  const post = useCallback(
    async (url: string, data?: any, requestOptions?: RequestInit) => {
      return api.execute(async () => {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...requestOptions?.headers,
          },
          body: data ? JSON.stringify(data) : undefined,
          ...requestOptions,
          signal: api.cancel ? undefined : new AbortController().signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ApiError({
            success: false,
            error: {
              code: errorData.error?.code || `HTTP_${response.status}`,
              message: errorData.error?.message || 'Request failed',
              details: errorData.error?.details,
            },
            timestamp: new Date().toISOString(),
          });
        }

        return response.json();
      });
    },
    [api]
  );

  return {
    ...api,
    post,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate<T = any>(options: UseApiOptions = {}) {
  const [optimisticData, setOptimisticData] = useState<T | null>(null);
  const api = useApi<T>(options);

  const optimisticUpdate = useCallback(
    async (
      optimisticData: T,
      apiCall: () => Promise<T>,
      rollback?: () => void
    ) => {
      // Set optimistic data immediately
      setOptimisticData(optimisticData);

      try {
        const result = await api.execute(apiCall);
        setOptimisticData(null);
        return result;
      } catch (error) {
        // Rollback on error
        setOptimisticData(null);
        rollback?.();
        throw error;
      }
    },
    [api]
  );

  return {
    ...api,
    optimisticData,
    optimisticUpdate,
  };
}

// Hook for infinite scroll/pagination
export function useInfiniteApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const api = useApi<{ data: T[]; pagination: { hasNext: boolean } }>(options);

  const loadMore = useCallback(
    async (apiCall: (page: number) => Promise<{ data: T[]; pagination: { hasNext: boolean } }>) => {
      if (!hasMore || api.loading) return;

      const result = await api.execute(() => apiCall(page));
      if (result) {
        setData(prev => [...prev, ...result.data]);
        setHasMore(result.pagination.hasNext);
        setPage(prev => prev + 1);
      }
    },
    [api, hasMore, page]
  );

  const reset = useCallback(() => {
    setData([]);
    setHasMore(true);
    setPage(1);
    api.reset();
  }, [api]);

  return {
    data,
    hasMore,
    page,
    loading: api.loading,
    error: api.error,
    loadMore,
    reset,
  };
} 