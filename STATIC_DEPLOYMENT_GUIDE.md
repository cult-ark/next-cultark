# Static Deployment Guide - Next.js CultArk Website on Hostinger

## Overview

This guide provides step-by-step instructions for deploying the Next.js CultArk website as static pages on Hostinger using `next export`.

## ✅ Pre-deployment Checklist

- [x] Next.js configuration updated for static export
- [x] API routes removed (not supported in static export)
- [x] Services updated to use direct WordPress API calls
- [x] generateStaticParams added to all dynamic routes
- [x] Static export build completed successfully
- [x] .htaccess file created for Hostinger
- [x] Environment variables configured for production

## 📁 Generated Files Structure

The static export created the following structure in the `out/` directory:

```
out/
├── _next/                    # Next.js static assets (CSS, JS)
├── blog/                     # Blog pages (static HTML)
├── services/                 # Service pages (static HTML)
├── portfolio/                # Portfolio pages (static HTML)
├── case-studies/            # Case study pages (static HTML)
├── careers/                 # Careers page (static HTML)
├── report/                  # Report page (static HTML)
├── images/                  # Static images and assets
├── docs/                    # PDF documents
├── index.html               # Home page
├── 404.html                 # 404 error page
├── robots.txt               # SEO robots file
├── sitemap.xml              # SEO sitemap
└── .htaccess                # Apache configuration for Hostinger
```

## 🚀 Deployment Steps

### Step 1: Prepare Files for Upload

1. **Verify the build output**:
   ```bash
   ls -la out/
   ```

2. **Check that all required files are present**:
   - `index.html` (home page)
   - `_next/` directory (Next.js assets)
   - All page directories with `index.html` files
   - `.htaccess` file for Apache configuration
   - Static assets in `images/` and `docs/`

### Step 2: Upload to Hostinger

#### Option A: Using Hostinger File Manager

1. **Login to Hostinger Control Panel**
   - Go to your Hostinger account
   - Navigate to "File Manager"

2. **Navigate to public_html directory**
   - Open the `public_html` folder (or your domain's root folder)

3. **Clear existing files** (if any):
   - Select all existing files in public_html
   - Delete them to ensure clean deployment

4. **Upload the static files**:
   - Select all files and folders from the `out/` directory
   - Upload them to the `public_html` directory
   - Ensure the `.htaccess` file is uploaded and visible

#### Option B: Using FTP/SFTP

1. **Connect via FTP client** (FileZilla, WinSCP, etc.):
   - Host: Your domain or Hostinger FTP server
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to public_html**:
   - Change to the `public_html` directory

3. **Upload all files**:
   - Upload all contents from the `out/` directory
   - Maintain the directory structure
   - Ensure `.htaccess` is uploaded

### Step 3: Configure Hostinger Settings

#### Domain Configuration

1. **Set Document Root** (if needed):
   - In Hostinger control panel, go to "Domains"
   - Ensure your domain points to `public_html`

2. **Enable Apache Modules** (usually enabled by default):
   - mod_rewrite (for URL rewriting)
   - mod_deflate (for compression)
   - mod_expires (for caching)
   - mod_headers (for custom headers)

#### SSL Certificate

1. **Enable SSL**:
   - In Hostinger control panel, go to "SSL"
   - Enable "Force HTTPS" for your domain
   - This will redirect all HTTP traffic to HTTPS

### Step 4: Environment Variables (if needed)

Since this is a static export, most environment variables are baked into the build. However, if you need to update any:

1. **WordPress API URL**: Already set to `https://backup.cultark.net`
2. **Site URL**: Set to your production domain `https://cultark.com`

### Step 5: Verify Deployment

#### Test Core Functionality

1. **Home Page**:
   - Visit `https://yourdomain.com`
   - Verify the home page loads correctly

2. **Navigation**:
   - Test all navigation links
   - Ensure pages load without errors

3. **Dynamic Routes**:
   - Test blog posts: `/blog/[slug]`
   - Test services: `/services/[slug]`
   - Test portfolio: `/portfolio/[slug]`
   - Test case studies: `/case-studies/[slug]`

4. **Static Assets**:
   - Verify images load correctly
   - Check that CSS and JavaScript files load
   - Test PDF downloads in case studies

5. **SEO Elements**:
   - Check `robots.txt`: `https://yourdomain.com/robots.txt`
   - Check `sitemap.xml`: `https://yourdomain.com/sitemap.xml`
   - Verify meta tags and Open Graph data

#### Performance Testing

1. **Page Speed**:
   - Use Google PageSpeed Insights
   - Test Core Web Vitals
   - Verify compression is working

2. **Mobile Responsiveness**:
   - Test on various device sizes
   - Verify touch interactions work

3. **Browser Compatibility**:
   - Test in Chrome, Firefox, Safari, Edge
   - Check for JavaScript errors in console

### Step 6: Post-Deployment Configuration

#### Analytics and Monitoring

1. **Google Analytics** (if configured):
   - Verify tracking is working
   - Check real-time data

2. **Search Console**:
   - Submit sitemap to Google Search Console
   - Monitor for crawl errors

#### CDN Configuration (Optional)

1. **Cloudflare** (recommended):
   - Add your domain to Cloudflare
   - Configure caching rules for static assets
   - Enable additional performance optimizations

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. 404 Errors on Page Refresh

**Problem**: Direct URLs or page refreshes return 404 errors.

**Solution**: Ensure `.htaccess` file is properly uploaded and contains the rewrite rules.

```apache
# Check this rule is present in .htaccess
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

#### 2. Images Not Loading

**Problem**: Images return 404 or don't display.

**Solution**: 
- Verify `images/` directory was uploaded correctly
- Check file permissions (should be 644 for files, 755 for directories)
- Ensure image paths in HTML are correct

#### 3. CSS/JS Not Loading

**Problem**: Styling is broken or JavaScript doesn't work.

**Solution**:
- Verify `_next/` directory was uploaded completely
- Check browser console for 404 errors
- Ensure file permissions are correct

#### 4. Slow Loading Times

**Problem**: Pages load slowly.

**Solution**:
- Verify compression is enabled (check `.htaccess`)
- Enable Cloudflare or other CDN
- Optimize images further if needed

#### 5. API Calls Failing

**Problem**: Dynamic content doesn't load.

**Solution**:
- Check browser console for CORS errors
- Verify WordPress API is accessible
- Ensure API URLs are correct in production

### Debugging Steps

1. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for JavaScript errors or failed requests

2. **Verify File Structure**:
   - Use FTP client to confirm all files uploaded correctly
   - Check file permissions and ownership

3. **Test .htaccess Rules**:
   - Temporarily rename `.htaccess` to `.htaccess-backup`
   - Test if basic HTML pages load
   - Restore `.htaccess` and test rewrite rules

## 📈 Performance Optimization

### Caching Strategy

The `.htaccess` file includes:
- **Static assets**: Cached for 1 year
- **HTML files**: Cached for 1 hour
- **Compression**: Enabled for all text-based files

### CDN Recommendations

1. **Cloudflare** (Free tier available):
   - Global CDN with edge caching
   - Additional security features
   - Easy DNS management

2. **KeyCDN** or **MaxCDN**:
   - Alternative CDN providers
   - Good performance for static assets

### Image Optimization

Since Next.js Image optimization is disabled for static export:
- Use WebP format where possible
- Compress images before upload
- Consider lazy loading for below-the-fold images

## 🔄 Updates and Maintenance

### Updating the Site

1. **Make changes locally**
2. **Run the export**:
   ```bash
   npm run export
   ```
3. **Upload new files** to Hostinger
4. **Clear CDN cache** (if using Cloudflare)

### Regular Maintenance

1. **Weekly**: Check for broken links and 404 errors
2. **Monthly**: Review performance metrics and Core Web Vitals
3. **Quarterly**: Update dependencies and rebuild

## 📞 Support Resources

- **Hostinger Support**: Available 24/7 via live chat
- **Next.js Documentation**: https://nextjs.org/docs/advanced-features/static-html-export
- **Apache .htaccess Guide**: https://httpd.apache.org/docs/current/howto/htaccess.html

## ✅ Deployment Checklist

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present and configured
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Dynamic routes load properly
- [ ] Images and assets display correctly
- [ ] PDF downloads work
- [ ] Mobile responsiveness verified
- [ ] SSL certificate is active
- [ ] robots.txt and sitemap.xml are accessible
- [ ] Performance testing completed
- [ ] Analytics tracking verified (if applicable)

## 🎉 Conclusion

Your Next.js CultArk website is now successfully deployed as static pages on Hostinger! The site benefits from:

- **Fast loading times** with static HTML
- **SEO optimization** with proper meta tags and sitemaps
- **Reliable hosting** with Hostinger's infrastructure
- **Cost-effective solution** with static hosting
- **Easy maintenance** with simple file uploads

The deployment is complete and your website should be fully functional at your domain.