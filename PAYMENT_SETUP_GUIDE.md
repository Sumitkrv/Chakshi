# Payment Integration Setup Guide

## Overview
This guide explains how to set up Razorpay payment integration for the Legal Platform pricing page.

## Features Implemented
- ✅ **Aligned Pricing Cards**: All cards now have consistent heights and professional styling
- ✅ **Razorpay Integration**: Complete payment processing with Indian Rupee support
- ✅ **Loading States**: Visual feedback during payment processing
- ✅ **Payment Status**: Success, error, and cancellation notifications
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Professional UI**: Enhanced visual hierarchy and better button positioning

## Setup Instructions

### 1. Razorpay Account Setup
1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your Test/Live API credentials:
   - Key ID (e.g., `rzp_test_1234567890`)
   - Key Secret
   - Webhook Secret (optional)

### 2. Environment Configuration
1. Copy `env-template.txt` to `.env` in your project root
2. Replace placeholder values with your Razorpay credentials:
```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_actual_key_here
```

### 3. Backend Setup (Node.js/Express)
1. Install required packages:
```bash
npm install razorpay express crypto cors dotenv
```

2. Use the provided `payment-api-example.js` as reference
3. Start your backend server:
```bash
node payment-api-example.js
```

### 4. Frontend Integration
The payment integration is already implemented in `Pricing.js` with:
- Razorpay script loading
- Payment flow handling
- Error management
- Success notifications

## Payment Flow
1. **User clicks "Get Started"** → Loading state activates
2. **Order creation** → Backend creates Razorpay order
3. **Payment modal** → Razorpay checkout opens
4. **Payment processing** → User completes payment
5. **Verification** → Backend verifies payment signature
6. **Success/Error** → User sees appropriate notification

## Card Design Improvements

### Before:
- Inconsistent card heights
- Basic button styling
- Simple layout

### After:
- ✅ **Fixed height cards** (580px minimum)
- ✅ **Featured badge** for Professional plan
- ✅ **Enhanced hover effects** with smooth transitions
- ✅ **Better spacing** and visual hierarchy
- ✅ **Professional buttons** with loading states
- ✅ **Consistent styling** across all plans

## API Endpoints Required

### 1. Create Order
```
POST /api/create-order
Body: { amount, currency, planName, billingCycle }
Response: { id, currency, amount, receipt }
```

### 2. Verify Payment
```
POST /api/verify-payment
Body: { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan, cycle }
Response: { success, message, payment_id }
```

### 3. Webhook (Optional)
```
POST /api/razorpay-webhook
Headers: x-razorpay-signature
Body: Razorpay event data
```

## Testing

### Test Mode
1. Use test credentials from Razorpay dashboard
2. Use test card numbers:
   - Success: `4111 1111 1111 1111`
   - Failure: `4000 0000 0000 0002`
3. Any CVV and future expiry date

### Live Mode
1. Switch to live credentials
2. Enable live mode in Razorpay dashboard
3. Test with real payment methods

## Security Best Practices
- ✅ Server-side payment verification
- ✅ Signature validation
- ✅ Environment variables for secrets
- ✅ HTTPS in production
- ✅ Input validation
- ✅ Error handling

## Troubleshooting

### Common Issues:
1. **Payment modal not opening**: Check if Razorpay script is loaded
2. **Order creation fails**: Verify backend API endpoints
3. **Payment verification fails**: Check signature calculation
4. **CORS errors**: Configure CORS in backend

### Debug Steps:
1. Check browser console for errors
2. Verify API responses in Network tab
3. Check backend logs
4. Validate environment variables

## Support
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Webhook Events](https://razorpay.com/docs/webhooks/)

## Card Styling Details

### Professional Plan (Featured):
- ✅ "Most Popular" badge
- ✅ Enhanced scaling and shadow effects
- ✅ Pre-selected appearance
- ✅ Highlighted button styling

### Standard & Basic Plans:
- ✅ Consistent heights with Professional
- ✅ Smooth hover transitions
- ✅ Unified color scheme
- ✅ Professional button interactions

### Responsive Design:
- ✅ Mobile-first approach
- ✅ Flexible grid layout
- ✅ Touch-friendly buttons
- ✅ Optimized spacing

The pricing page is now production-ready with professional design and complete payment integration!