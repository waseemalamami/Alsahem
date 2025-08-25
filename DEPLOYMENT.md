# 🚀 Deployment Guide

This guide covers deploying both the frontend and backend of the Saham Real Estate platform.

## 📋 Prerequisites

- GitHub account
- Node.js 18+ installed
- .NET Core 8 SDK installed
- Database (SQL Server, PostgreSQL, or SQLite)

## 🎯 Deployment Options

### Option 1: Free Hosting (Recommended for Start)

#### Frontend: Vercel (Free)
- **URL**: https://vercel.com
- **Features**: Automatic deployments, custom domains, CDN
- **Limits**: 100GB bandwidth/month, 100 serverless function executions/day

#### Backend: Railway (Free)
- **URL**: https://railway.app
- **Features**: Easy deployment, database hosting, environment variables
- **Limits**: $5 credit/month (usually enough for small projects)

### Option 2: Paid Hosting (Production)

#### Frontend: Vercel Pro ($20/month)
- **Features**: Unlimited bandwidth, team collaboration, analytics

#### Backend: Azure App Service ($13/month)
- **Features**: Scalable, managed, integrated with Azure services

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Saham Real Estate Platform"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/saham-real-estate.git
git branch -M main
git push -u origin main
```

### 2. Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Import Project**:
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project
4. **Configure Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Environment Variables**:
   - Add `VITE_API_URL` with your backend URL
6. **Deploy**: Click "Deploy"

### 3. Deploy Backend to Railway

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Create Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
4. **Configure Settings**:
   - **Root Directory**: `SahamRealEstateAPI`
   - **Build Command**: `dotnet build`
   - **Start Command**: `dotnet run`
5. **Environment Variables**:
   ```env
   ASPNETCORE_ENVIRONMENT=Production
   ConnectionStrings__DefaultConnection=your-database-connection-string
   JwtSettings__SecretKey=your-secret-key
   JwtSettings__Issuer=SahamRealEstate
   JwtSettings__Audience=SahamRealEstateUsers
   ```
6. **Add Database**:
   - Click "New" → "Database"
   - Choose PostgreSQL or MySQL
   - Railway will provide connection string
7. **Deploy**: Railway will auto-deploy

### 4. Update Frontend API URL

After backend deployment, update the frontend environment variable:

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Update `VITE_API_URL`** with your Railway backend URL
5. **Redeploy** the frontend

## 🌐 Custom Domain Setup

### Frontend (Vercel)
1. **Add Domain** in Vercel dashboard
2. **Configure DNS**:
   - Add CNAME record pointing to your Vercel URL
   - Or use Vercel's nameservers

### Backend (Railway)
1. **Add Custom Domain** in Railway dashboard
2. **Configure DNS**:
   - Add CNAME record pointing to your Railway URL

## 🔒 Security Considerations

### Environment Variables
- **Never commit** sensitive data to Git
- **Use strong passwords** for databases
- **Rotate JWT secrets** regularly

### CORS Configuration
Update backend CORS settings for production:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowProduction", policy =>
    {
        policy.WithOrigins("https://your-frontend-domain.com")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

### Database Security
- **Use SSL connections** for production databases
- **Enable connection pooling**
- **Regular backups**

## 📊 Monitoring & Analytics

### Frontend (Vercel)
- **Analytics**: Built-in analytics dashboard
- **Performance**: Core Web Vitals monitoring
- **Errors**: Error tracking and reporting

### Backend (Railway)
- **Logs**: Real-time log viewing
- **Metrics**: CPU, memory, network usage
- **Alerts**: Set up monitoring alerts

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      - run: dotnet build
      - run: dotnet test
      - uses: railway/deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Frontend can't connect to backend**:
   - Check CORS configuration
   - Verify API URL in environment variables
   - Ensure backend is running

2. **Database connection errors**:
   - Verify connection string
   - Check database is accessible
   - Ensure migrations are applied

3. **Build failures**:
   - Check Node.js version
   - Verify all dependencies are installed
   - Review build logs

### Debug Commands

```bash
# Frontend
npm run build
npm run preview

# Backend
dotnet build
dotnet run --environment Production
```

## 📈 Scaling Considerations

### Frontend
- **CDN**: Vercel provides global CDN
- **Caching**: Implement proper caching strategies
- **Bundle size**: Optimize JavaScript bundles

### Backend
- **Load balancing**: Add multiple instances
- **Database**: Consider read replicas
- **Caching**: Implement Redis for session storage

## 💰 Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month
- **Railway**: $5 credit/month
- **Database**: Usually included in hosting

### Paid Upgrades
- **Vercel Pro**: $20/month for unlimited bandwidth
- **Railway**: Pay-as-you-use pricing
- **Database**: $5-20/month depending on size

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance optimized

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **GitHub Issues**: Create issues in your repository
- **Community**: Stack Overflow, Discord communities

---

**Happy Deploying! 🚀**
