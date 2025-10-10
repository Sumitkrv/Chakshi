# 🚀 STEP 5: Production Deployment

## 5.1 Pre-Production Checklist

### Required Before Going Live:
- ✅ Razorpay KYC verification completed
- ✅ Live API credentials obtained from Razorpay
- ✅ Domain and SSL certificate ready
- ✅ Production server/hosting ready
- ✅ Payment flow tested with test credentials
- ✅ Database setup (if using persistent storage)

## 5.2 Get Live Razorpay Credentials

### Switch to Live Mode:
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Complete KYC verification (if not done)
3. Switch to **"Live Mode"** toggle in dashboard
4. Go to **Settings** → **API Keys**
5. Generate Live API Keys:
   - **Live Key ID**: `rzp_live_xxxxxxxxxx`
   - **Live Key Secret**: Click "Show" to reveal

### Live Mode Requirements:
- ✅ Business verification completed
- ✅ Bank account verified
- ✅ PAN card verified
- ✅ Business documents uploaded
- ✅ Website verification completed

## 5.3 Production Environment Variables

### Update Production .env:
```env
# ========================================
# PRODUCTION ENVIRONMENT
# ========================================

NODE_ENV=production

# ========================================
# RAZORPAY LIVE CREDENTIALS
# ========================================

# Live Mode Credentials
RAZORPAY_KEY_ID=rzp_live_your_actual_live_key_id
RAZORPAY_KEY_SECRET=your_actual_live_key_secret
RAZORPAY_WEBHOOK_SECRET=your_live_webhook_secret

# Frontend Live Key
REACT_APP_RAZORPAY_KEY_ID=rzp_live_your_actual_live_key_id

# ========================================
# PRODUCTION API CONFIGURATION
# ========================================

PORT=3001
API_BASE_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# ========================================
# PRODUCTION SECURITY
# ========================================

# Generate new secure secrets for production
JWT_SECRET=your_production_jwt_secret_very_long_and_random
SESSION_SECRET=your_production_session_secret_very_long_and_random

# ========================================
# PRODUCTION DATABASE
# ========================================

# MongoDB Atlas (recommended for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/legal_platform?retryWrites=true&w=majority

# Or PostgreSQL
# DATABASE_URL=postgresql://username:password@hostname:port/database

# ========================================
# PRODUCTION EMAIL (Required)
# ========================================

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_production_email@yourdomain.com
SMTP_PASS=your_app_password

FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Legal Platform

# ========================================
# MONITORING & LOGGING
# ========================================

# Sentry for error tracking
SENTRY_DSN=your_sentry_dsn_for_error_tracking

# Log level for production
LOG_LEVEL=error

# ========================================
# SSL & SECURITY
# ========================================

# Force HTTPS
FORCE_HTTPS=true

# CORS origins (your actual domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 5.4 Deployment Options

### Option 1: Vercel (Recommended for React + Serverless)

#### Deploy Frontend:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd e:\Chiksha\Chakshi
vercel --prod

# Configure environment variables in Vercel dashboard:
# REACT_APP_RAZORPAY_KEY_ID=rzp_live_your_key
```

#### Deploy Backend as Serverless Functions:
Create `api/` folder structure for Vercel:
```
api/
├── create-order.js
├── verify-payment.js
├── payment-status.js
└── razorpay-webhook.js
```

### Option 2: Heroku (Full-Stack Deployment)

#### Prepare for Heroku:
```bash
# Install Heroku CLI
# Create Procfile
echo "web: node server/index.js" > Procfile

# Create heroku app
heroku create your-legal-platform-api

# Set environment variables
heroku config:set RAZORPAY_KEY_ID=rzp_live_your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 3: DigitalOcean/AWS/Google Cloud

#### Server Setup:
```bash
# Ubuntu/Debian server setup
sudo apt update
sudo apt install nginx nodejs npm

# Clone repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
npm install --production

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start server/index.js --name "legal-platform-api"
pm2 startup
pm2 save

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/legal-platform
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 5.5 SSL Certificate Setup

### Using Certbot (Let's Encrypt):
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Verify auto-renewal
sudo certbot renew --dry-run
```

## 5.6 Database Setup (If Required)

### Option 1: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Set up database user
4. Whitelist IP addresses
5. Get connection string
6. Update MONGODB_URI in production .env

### Option 2: PostgreSQL (Heroku Postgres/DigitalOcean)
```bash
# Create database schema
CREATE DATABASE legal_platform;
CREATE USER legal_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE legal_platform TO legal_user;
```

## 5.7 Webhook Configuration for Production

### Set up webhook in Razorpay:
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Create new webhook
3. URL: `https://yourdomain.com/api/razorpay-webhook`
4. Events: payment.captured, payment.failed, order.paid
5. Secret: Generate and save in environment variables

## 5.8 Monitoring and Logging

### Error Tracking with Sentry:
```bash
# Install Sentry
npm install @sentry/node

# Configure in server/index.js
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### Health Monitoring:
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerts for API downtime
- Monitor payment success rates
- Set up log aggregation (LogRocket, DataDog)

## 5.9 Security Hardening

### Production Security Checklist:
- ✅ HTTPS enforced everywhere
- ✅ Environment variables secured
- ✅ Rate limiting enabled
- ✅ CORS properly configured
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose sensitive data
- ✅ API keys rotated regularly
- ✅ Webhook signatures verified
- ✅ Database access restricted
- ✅ Server access logs monitored

### Security Headers:
```javascript
// Enhanced helmet configuration for production
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "checkout.razorpay.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "api.razorpay.com"],
      frameSrc: ["'self'", "api.razorpay.com"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 5.10 Testing Production Environment

### Pre-Launch Testing:
```bash
# Test all API endpoints
curl https://yourdomain.com/api/health
curl -X POST https://yourdomain.com/api/create-order -H "Content-Type: application/json" -d '{"amount":100000,"planName":"Test","billingCycle":"monthly"}'

# Test SSL certificate
curl -I https://yourdomain.com

# Test payment flow with live credentials (small amount)
# Use real card with ₹1 to test complete flow
```

### Production Testing Checklist:
- [ ] All API endpoints responding correctly
- [ ] SSL certificate valid and configured
- [ ] Payment flow works with live Razorpay
- [ ] Webhook receiving events correctly
- [ ] Database connections working
- [ ] Email notifications sending
- [ ] Error tracking reporting
- [ ] Monitoring alerts configured
- [ ] Performance metrics within acceptable limits
- [ ] Security headers configured correctly

## 5.11 Go-Live Checklist

### Final Steps Before Launch:
- [ ] ✅ All tests passing in production environment
- [ ] ✅ Live Razorpay credentials configured and tested
- [ ] ✅ SSL certificate installed and verified
- [ ] ✅ Domain DNS properly configured
- [ ] ✅ Database backup strategy in place
- [ ] ✅ Monitoring and alerting configured
- [ ] ✅ Error tracking active
- [ ] ✅ Payment notification emails working
- [ ] ✅ Customer support process documented
- [ ] ✅ Incident response plan ready

### Post-Launch Monitoring:
- Monitor payment success rates
- Track API response times
- Monitor error rates
- Check webhook delivery success
- Monitor server resource usage
- Track customer support tickets

---

## ✅ Production Deployment Checklist:
- [ ] Live Razorpay credentials obtained
- [ ] Production environment variables configured
- [ ] Database setup and configured
- [ ] SSL certificate installed
- [ ] Application deployed to production server
- [ ] Webhook configured and tested
- [ ] Monitoring and error tracking active
- [ ] Security hardening implemented
- [ ] Production testing completed
- [ ] Go-live checklist verified

**🎉 Congratulations! Your payment integration is now live in production!**

## 📞 Support and Maintenance

### Regular Maintenance Tasks:
- Monitor payment success rates weekly
- Review error logs daily
- Update dependencies monthly
- Rotate API keys quarterly
- Review security settings quarterly
- Backup database regularly

### Getting Help:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)
- [Technical Support](mailto:support@razorpay.com)