# 🚀 STEP 1: Razorpay Account Setup

## 1.1 Create Razorpay Account

### Visit Razorpay Dashboard
1. Go to https://dashboard.razorpay.com/
2. Click "Sign Up" if you don't have an account
3. Fill in your business details:
   - Business Name: "Legal Platform" (or your company name)
   - Business Type: "Legal Services" or "SaaS"
   - Business Category: "Professional Services"
   - Website: Your website URL

### Account Verification
1. Complete email verification
2. Add your PAN card details
3. Upload required business documents
4. Complete KYC verification (may take 1-2 business days)

## 1.2 Get Test Credentials

### Access API Keys
1. Login to Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Under "Test Mode", you'll find:
   - **Key ID**: `rzp_test_xxxxxxxxxx`
   - **Key Secret**: Click "Show" to reveal (keep this secret!)

### Test Credentials Example:
```
Key ID: rzp_test_1234567890abcdef
Key Secret: abcdef1234567890ghijklmnopqrstuv
```

## 1.3 Configure Razorpay Settings

### Payment Methods
1. Go to **Settings** → **Payment Methods**
2. Enable required payment methods:
   - ✅ Credit/Debit Cards
   - ✅ Net Banking
   - ✅ UPI
   - ✅ Wallets (Paytm, PhonePe, etc.)
   - ✅ EMI (if needed)

### Webhook Configuration (Optional but Recommended)
1. Go to **Settings** → **Webhooks**
2. Click "Create Webhook"
3. Enter webhook URL: `https://yourdomain.com/api/razorpay-webhook`
4. Select events:
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ order.paid
5. Copy the webhook secret for later use

### Business Settings
1. Go to **Settings** → **Business Settings**
2. Configure:
   - Business logo (will appear in payment modal)
   - Business description
   - Contact details
   - Return/Refund policy

## 1.4 Important Notes

### Test Mode vs Live Mode
- **Test Mode**: Use for development and testing
- **Live Mode**: Use for production (requires KYC completion)

### Rate Limits
- Test Mode: 1000 requests per hour
- Live Mode: Based on your plan

### Settlement
- Test payments are not settled
- Live payments are settled to your bank account (T+3 working days)

## 1.5 Security Best Practices

### API Key Security
- ✅ Never expose Key Secret in frontend code
- ✅ Use environment variables
- ✅ Regenerate keys if compromised
- ✅ Use HTTPS in production

### Webhook Security
- ✅ Verify webhook signatures
- ✅ Use HTTPS for webhook URLs
- ✅ Implement idempotency

---

## ✅ Checklist for Step 1:
- [ ] Razorpay account created
- [ ] Business details filled
- [ ] Email verified
- [ ] Test API credentials obtained
- [ ] Payment methods configured
- [ ] Webhook configured (optional)
- [ ] Business settings updated

**Next Step**: Configure environment variables using these credentials