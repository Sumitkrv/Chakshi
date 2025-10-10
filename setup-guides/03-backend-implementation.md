# 🖥️ STEP 3: Backend API Implementation

## 3.1 Install Required Dependencies

### Navigate to your project root and install packages:

```bash
cd e:\Chiksha\Chakshi
npm init -y  # If package.json doesn't exist
npm install express razorpay dotenv cors helmet morgan express-rate-limit crypto
npm install -D nodemon concurrently
```

### Update package.json scripts:

```json
{
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js",
    "dev:full": "concurrently \"npm run dev\" \"npm start\"",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

## 3.2 Create Server Directory Structure

```
e:\Chiksha\Chakshi\
├── server/
│   ├── index.js           # Main server file
│   ├── routes/
│   │   └── payment.js     # Payment routes
│   ├── middleware/
│   │   ├── auth.js        # Authentication middleware
│   │   ├── validation.js  # Input validation
│   │   └── security.js    # Security middleware
│   ├── config/
│   │   ├── razorpay.js    # Razorpay configuration
│   │   └── database.js    # Database configuration
│   └── utils/
│       ├── logger.js      # Logging utility
│       └── response.js    # Response formatter
```

---

## ✅ Checklist for Step 3:
- [ ] Dependencies installed
- [ ] Server directory structure created
- [ ] Main server file implemented
- [ ] Payment routes configured
- [ ] Security middleware added
- [ ] Error handling implemented
- [ ] Logging configured

**Next Step**: Test the payment flow with test credentials