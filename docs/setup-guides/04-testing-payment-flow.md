# 🧪 STEP 4: Testing Payment Flow

## 4.1 Pre-Testing Setup

### Required Information Before Testing:
1. ✅ Razorpay test credentials from dashboard
2. ✅ Environment variables configured
3. ✅ Backend server implemented
4. ✅ Frontend payment integration ready

### Update .env with Your Test Credentials:
```env
# Replace these with your actual test credentials from Razorpay dashboard
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_key_secret_here
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
```

## 4.2 Start the Development Environment

### Terminal 1 - Start Backend Server:
```bash
cd e:\Chiksha\Chakshi
npm run server:dev
```

### Terminal 2 - Start React App:
```bash
cd e:\Chiksha\Chakshi
npm start
```

### Or run both together:
```bash
npm run dev
```

## 4.3 Verify Server Health

### Check if backend is running:
Visit: http://localhost:3001/health

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-09T...",
  "uptime": 123.456,
  "environment": "development"
}
```

### Check API endpoints:
Visit: http://localhost:3001/

**Expected Response:**
```json
{
  "message": "Legal Platform Payment API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "createOrder": "POST /api/create-order",
    "verifyPayment": "POST /api/verify-payment",
    "paymentStatus": "GET /api/payment-status/:paymentId",
    "webhook": "POST /api/razorpay-webhook"
  }
}
```

## 4.4 Test Payment Flow

### Step 1: Access Pricing Page
1. Open: http://localhost:3000
2. Navigate to pricing section
3. Verify all three pricing cards are displayed correctly

### Step 2: Initiate Payment
1. Click "Get Started" on any plan
2. Verify loading state appears
3. Check browser console for any errors

### Step 3: Complete Test Payment
When Razorpay modal opens, use these **test card details**:

#### ✅ Successful Payment Test:
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3-digit number (e.g., 123)
Name: Test User
```

#### ❌ Failed Payment Test:
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVV: Any 3-digit number
Name: Test User
```

#### 🔄 Other Test Scenarios:
```
# Insufficient funds
Card Number: 4000 0000 0000 0069

# Card declined
Card Number: 4000 0000 0000 0119

# Invalid card
Card Number: 4242 4242 4242 4241
```

## 4.5 Testing Checklist

### Frontend Testing:
- [ ] Pricing cards display correctly
- [ ] Billing toggle (monthly/yearly) works
- [ ] "Get Started" button shows loading state
- [ ] Razorpay modal opens successfully
- [ ] Payment success notification appears
- [ ] Payment failure notification appears
- [ ] Payment cancellation handled properly

### Backend Testing:
- [ ] Server starts without errors
- [ ] Health endpoint responds correctly
- [ ] Create order endpoint works
- [ ] Payment verification works
- [ ] Error handling works properly
- [ ] CORS is configured correctly

### Payment Testing:
- [ ] Successful payment flows completely
- [ ] Failed payment shows error message
- [ ] Payment cancellation works
- [ ] Multiple consecutive payments work
- [ ] Different plan selections work
- [ ] Monthly/yearly billing works

## 4.6 Debug Common Issues

### Issue 1: Razorpay Modal Not Opening
**Symptoms:** Button loading but modal doesn't appear
**Solutions:**
- Check if Razorpay script is loaded in browser console
- Verify RAZORPAY_KEY_ID is correctly set in frontend
- Check browser console for JavaScript errors
- Ensure popup blockers are disabled

### Issue 2: Order Creation Fails
**Symptoms:** Network error or 500 status
**Solutions:**
- Verify backend server is running on port 3001
- Check .env file has correct Razorpay credentials
- Verify CORS is allowing requests from frontend
- Check server logs for detailed error messages

### Issue 3: Payment Verification Fails
**Symptoms:** Payment completes but shows error
**Solutions:**
- Verify RAZORPAY_KEY_SECRET is correct in backend
- Check signature calculation in verify endpoint
- Ensure payment data is being sent correctly
- Check server logs for verification details

### Issue 4: CORS Errors
**Symptoms:** "Access-Control-Allow-Origin" errors
**Solutions:**
- Verify CORS middleware is configured
- Check FRONTEND_URL in .env matches React app URL
- Ensure both servers are running on correct ports
- Clear browser cache and restart servers

## 4.7 Test Payment Flow Script

### Manual Test Script:
```bash
# 1. Start servers
npm run dev

# 2. Wait for both servers to start
# Frontend: http://localhost:3000
# Backend: http://localhost:3001

# 3. Test health endpoints
curl http://localhost:3001/health

# 4. Test order creation (optional manual test)
curl -X POST http://localhost:3001/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299900,
    "currency": "INR",
    "planName": "Professional",
    "billingCycle": "monthly"
  }'
```

## 4.8 Test Data and Scenarios

### Test Plans:
1. **Basic Plan Monthly:** ₹499 (49,900 paise)
2. **Standard Plan Monthly:** ₹1,499 (149,900 paise)
3. **Professional Plan Monthly:** ₹2,999 (299,900 paise)
4. **Professional Plan Yearly:** ₹29,999 (2,999,900 paise)

### Test User Data:
```
Name: Test User
Email: test@example.com
Phone: 9999999999
```

---

## ✅ Testing Checklist:
- [ ] Environment variables updated with real test credentials
- [ ] Backend server running successfully
- [ ] Frontend application accessible
- [ ] Health endpoints responding
- [ ] Successful payment test completed
- [ ] Failed payment test completed
- [ ] Payment cancellation test completed
- [ ] All three plans tested
- [ ] Monthly/yearly billing tested
- [ ] Browser console clean (no errors)
- [ ] Server logs show proper flow

**Next Step**: Deploy to production with live credentials