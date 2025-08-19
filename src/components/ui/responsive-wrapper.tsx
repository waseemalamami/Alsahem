import React from 'react';
import { useMobile } from '@/hooks/use-mobile';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  showOnMobile?: boolean;
  showOnTablet?: boolean;
  showOnDesktop?: boolean;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
  showOnMobile,
  showOnTablet,
  showOnDesktop,
  hideOnMobile,
  hideOnTablet,
  hideOnDesktop,
}) => {
  const { isMobile, isTablet, isDesktop } = useMobile();

  // Determine if component should be shown
  let shouldShow = true;
  
  if (showOnMobile !== undefined && isMobile !== showOnMobile) shouldShow = false;
  if (showOnTablet !== undefined && isTablet !== showOnTablet) shouldShow = false;
  if (showOnDesktop !== undefined && isDesktop !== showOnDesktop) shouldShow = false;
  
  if (hideOnMobile && isMobile) shouldShow = false;
  if (hideOnTablet && isTablet) shouldShow = false;
  if (hideOnDesktop && isDesktop) shouldShow = false;

  if (!shouldShow) return null;

  // Determine responsive classes
  let responsiveClasses = '';
  if (isMobile) responsiveClasses = mobileClassName;
  else if (isTablet) responsiveClasses = tabletClassName;
  else responsiveClasses = desktopClassName;

  const combinedClassName = `${className} ${responsiveClasses}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
  center = true,
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    none: ''
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  };

  const containerClasses = [
    'w-full',
    center && 'mx-auto',
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  alignItems = 'stretch',
  justifyItems = 'start',
}) => {
  const gapClasses = {
    none: '',
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
    xl: 'gap-6 sm:gap-8 lg:gap-12'
  };

  const gridColsClasses = [
    `grid-cols-${cols.xs || 1}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`
  ].filter(Boolean).join(' ');

  const gridClasses = [
    'grid',
    gridColsClasses,
    gapClasses[gap],
    `items-${alignItems}`,
    `justify-items-${justifyItems}`,
    className
  ].join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  weight?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  align?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className = '',
  size = { xs: 'text-sm', sm: 'text-base', lg: 'text-lg' },
  weight = { xs: 'font-normal', sm: 'font-medium', lg: 'font-semibold' },
  align = { xs: 'text-center', sm: 'text-right' },
}) => {
  const sizeClasses = [
    size.xs && `text-xs ${size.xs}`,
    size.sm && `sm:${size.sm}`,
    size.md && `md:${size.md}`,
    size.lg && `lg:${size.lg}`,
    size.xl && `xl:${size.xl}`,
    size['2xl'] && `2xl:${size['2xl']}`
  ].filter(Boolean).join(' ');

  const weightClasses = [
    weight.xs && `font-normal ${weight.xs}`,
    weight.sm && `sm:${weight.sm}`,
    weight.md && `md:${weight.md}`,
    weight.lg && `lg:${weight.lg}`,
    weight.xl && `xl:${weight.xl}`,
    weight['2xl'] && `2xl:${weight['2xl']}`
  ].filter(Boolean).join(' ');

  const alignClasses = [
    align.xs && `text-center ${align.xs}`,
    align.sm && `sm:${align.sm}`,
    align.md && `md:${align.md}`,
    align.lg && `lg:${align.lg}`,
    align.xl && `xl:${align.xl}`,
    align['2xl'] && `2xl:${align['2xl']}`
  ].filter(Boolean).join(' ');

  const textClasses = [
    sizeClasses,
    weightClasses,
    alignClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={textClasses}>
      {children}
    </span>
  );
};
