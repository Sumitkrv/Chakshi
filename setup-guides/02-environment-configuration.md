# 🔧 STEP 2: Environment Variables Configuration

## 2.1 Create Environment Files

### Backend .env file
Create `.env` in your project root directory:

```bash
# Navigate to your project root
cd e:\Chiksha\Chakshi

# Create .env file
touch .env
```

### Frontend .env file
Create `.env` in your React app directory (if different):

```bash
# If React app is in a separate directory
cd src/
touch .env
```

## 2.2 Configure Backend Environment Variables

### Copy this template to your `.env` file:

```env
# ========================================
# RAZORPAY CONFIGURATION
# ========================================

# Test Mode Credentials (for development)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# Live Mode Credentials (for production - uncomment when ready)
# RAZORPAY_LIVE_KEY_ID=rzp_live_your_key_id_here
# RAZORPAY_LIVE_KEY_SECRET=your_live_key_secret_here
# RAZORPAY_LIVE_WEBHOOK_SECRET=your_live_webhook_secret_here

# ========================================
# API CONFIGURATION
# ========================================

# Server Configuration
PORT=3001
NODE_ENV=development
API_BASE_URL=http://localhost:3001

# CORS Configuration
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# ========================================
# DATABASE CONFIGURATION
# ========================================

# MongoDB (if using)
# MONGODB_URI=mongodb://localhost:27017/legal_platform

# PostgreSQL (if using)
# DATABASE_URL=postgresql://username:password@localhost:5432/legal_platform

# MySQL (if using)
# MYSQL_HOST=localhost
# MYSQL_USER=root
# MYSQL_PASSWORD=password
# MYSQL_DATABASE=legal_platform

# ========================================
# SECURITY
# ========================================

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your_session_secret_key_here_also_make_it_random

# Encryption
CRYPTO_SECRET=your_crypto_secret_for_sensitive_data

# ========================================
# EMAIL CONFIGURATION
# ========================================

# SMTP Settings (for payment confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Email Templates
FROM_EMAIL=noreply@legalplatform.com
FROM_NAME=Legal Platform

# ========================================
# LOGGING & MONITORING
# ========================================

# Log Level
LOG_LEVEL=info

# Sentry (for error tracking)
# SENTRY_DSN=your_sentry_dsn_here

# ========================================
# RATE LIMITING
# ========================================

# Rate Limit Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ========================================
# FILE UPLOAD
# ========================================

# File Upload Limits
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# AWS S3 (if using cloud storage)
# AWS_ACCESS_KEY_ID=your_aws_access_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret_key
# AWS_REGION=ap-south-1
# AWS_S3_BUCKET=your-bucket-name
```

## 2.3 Configure Frontend Environment Variables

### Create React .env file:

```env
# ========================================
# RAZORPAY FRONTEND CONFIGURATION
# ========================================

# Razorpay Public Key (safe to expose in frontend)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development

# ========================================
# APPLICATION CONFIGURATION
# ========================================

# App Configuration
REACT_APP_NAME=Legal Platform
REACT_APP_VERSION=1.0.0

# Features Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CHAT=true
REACT_APP_ENABLE_NOTIFICATIONS=true

# ========================================
# THIRD-PARTY SERVICES
# ========================================

# Google Analytics (if using)
# REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Google Maps (if using)
# REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key

# Intercom (if using)
# REACT_APP_INTERCOM_APP_ID=your_intercom_app_id
```

## 2.4 Replace Placeholder Values

### Update with your actual Razorpay credentials:

```bash
# Example with real test credentials:
RAZORPAY_KEY_ID=rzp_test_1234567890abcdef
RAZORPAY_KEY_SECRET=abcdef1234567890ghijklmnopqrstuv123456
RAZORPAY_WEBHOOK_SECRET=webhook_secret_from_dashboard
```

### Frontend configuration:
```bash
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcdef
```

## 2.5 Security Best Practices

### .gitignore Configuration
Add to your `.gitignore` file:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Dependencies
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Uploads
uploads/
```

### Environment Validation
Create `config/validateEnv.js`:

```javascript
const requiredEnvVars = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'JWT_SECRET',
  'PORT'
];

function validateEnvironment() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(envVar => console.error(`- ${envVar}`));
    process.exit(1);
  }
  
  console.log('✅ All required environment variables are set');
}

module.exports = { validateEnvironment };
```

## 2.6 Load Environment Variables

### In your main server file (app.js or index.js):

```javascript
// Load environment variables first
require('dotenv').config();

// Validate required environment variables
const { validateEnvironment } = require('./config/validateEnv');
validateEnvironment();

// Rest of your application
const express = require('express');
// ... other imports
```

---

## ✅ Checklist for Step 2:
- [ ] Created `.env` file in project root
- [ ] Added Razorpay test credentials
- [ ] Configured React environment variables
- [ ] Updated `.gitignore` to exclude `.env` files
- [ ] Added environment validation
- [ ] Generated secure JWT and session secrets
- [ ] Configured SMTP settings (optional)

**Next Step**: Implement the backend API using the provided example