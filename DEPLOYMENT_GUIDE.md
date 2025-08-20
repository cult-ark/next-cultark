# Deployment Guide - Next.js Cultark Website

## Overview

This guide provides step-by-step instructions for deploying the migrated Next.js Cultark website to various hosting platforms.

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git repository access
- Environment variables configured

## Environment Variables

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# WordPress API Configuration
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
WP_API_USERNAME=your_username
WP_API_PASSWORD=your_app_password

# External API URLs
NEXT_PUBLIC_API_BASE_URL=https://api.cultark.com

# Analytics (if applicable)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Other configuration
NEXT_PUBLIC_SITE_URL=https://cultark.com
```

### Environment-Specific Variables

**Development (.env.local)**
```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production (.env.production)**
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cultark.com
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications, offering seamless integration and optimal performance.

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Local**
   ```bash
   vercel
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all required environment variables
   - Set appropriate environments (Production, Preview, Development)

5. **Configure Custom Domain**
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add your custom domain (cultark.com)
   - Configure DNS records as instructed

#### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

#### Steps:

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18.17.0 or later

2. **Netlify Configuration (netlify.toml)**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "18.17.0"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [context.production.environment]
     NODE_ENV = "production"
   ```

3. **Environment Variables**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add all required environment variables

### Option 3: AWS Amplify

#### Steps:

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   - Add environment variables in Amplify Console
   - Configure for different branches (main, develop)

### Option 4: Docker Deployment

#### Dockerfile

```dockerfile
# Use the official Node.js 18 image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose (docker-compose.yml)

```yaml
version: '3.8'
services:
  nextjs-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://cultark.com
    env_file:
      - .env.production
    restart: unless-stopped
```

#### Deployment Commands

```bash
# Build the Docker image
docker build -t cultark-nextjs .

# Run the container
docker run -p 3000:3000 --env-file .env.production cultark-nextjs

# Using Docker Compose
docker-compose up -d
```

### Option 5: Traditional VPS/Server

#### Prerequisites
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18.17+ installed
- PM2 for process management
- Nginx for reverse proxy

#### Steps:

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/cultark-nextjs.git
   cd cultark-nextjs

   # Install dependencies
   npm ci

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "cultark-nextjs" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   # /etc/nginx/sites-available/cultark.com
   server {
       listen 80;
       server_name cultark.com www.cultark.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL Certificate (Let's Encrypt)**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y

   # Get SSL certificate
   sudo certbot --nginx -d cultark.com -d www.cultark.com
   ```

## Performance Optimization

### CDN Configuration

#### Cloudflare Setup
1. Add your domain to Cloudflare
2. Configure DNS records
3. Enable caching rules for static assets
4. Configure page rules for optimal caching

#### Cache Headers
```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Database Optimization (if applicable)
- Configure connection pooling
- Implement caching strategies
- Optimize database queries

## Monitoring and Maintenance

### Health Checks

Create a health check endpoint:

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  })
}
```

### Monitoring Setup

#### Vercel Analytics
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Backup Strategy

1. **Code Backup**: Git repository with regular commits
2. **Database Backup**: Regular database dumps (if applicable)
3. **Asset Backup**: CDN or cloud storage backup
4. **Configuration Backup**: Environment variables and config files

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

4. **Port Conflicts**
   ```bash
   # Use different port
   PORT=3001 npm run dev
   ```

### Logs and Debugging

```bash
# PM2 logs
pm2 logs cultark-nextjs

# Docker logs
docker logs container-name

# Vercel logs
vercel logs
```

## Security Considerations

### Security Headers
```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}
```

### Environment Security
- Never commit `.env` files to version control
- Use secure environment variable management
- Regularly rotate API keys and passwords
- Implement proper CORS policies

## Rollback Plan

### Quick Rollback Steps
1. **Vercel**: Use deployment rollback in dashboard
2. **Docker**: Keep previous image versions
3. **Traditional Server**: Maintain previous build in separate directory

### Rollback Script Example
```bash
#!/bin/bash
# rollback.sh

echo "Rolling back to previous version..."

# Stop current application
pm2 stop cultark-nextjs

# Switch to backup directory
cd /var/www/cultark-nextjs-backup

# Start backup version
pm2 start npm --name "cultark-nextjs" -- start

echo "Rollback completed"
```

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] API endpoints respond properly
- [ ] Images and assets load
- [ ] SEO metadata is present
- [ ] Social sharing works
- [ ] Mobile responsiveness maintained
- [ ] Performance metrics acceptable
- [ ] Error tracking configured
- [ ] Monitoring alerts set up
- [ ] SSL certificate valid
- [ ] DNS records configured
- [ ] CDN caching working

## Support and Maintenance

### Regular Maintenance Tasks
1. **Weekly**: Check error logs and performance metrics
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Performance audits and optimization
4. **Annually**: Security audit and infrastructure review

### Emergency Contacts
- Development Team: [contact information]
- Hosting Provider Support: [contact information]
- Domain Registrar: [contact information]

## Conclusion

This deployment guide provides comprehensive instructions for deploying the Next.js Cultark website across various platforms. Choose the deployment option that best fits your infrastructure requirements and follow the security and monitoring best practices for a successful production deployment.