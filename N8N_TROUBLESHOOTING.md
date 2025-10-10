# N8N Webhook Troubleshooting Guide

## 🚨 Current Issue: All Webhooks Returning 404 Errors

Based on the test results, all webhook endpoints are returning "404 Not Found" errors. This indicates the N8N workflows are not active or properly configured.

## 🔧 Solutions (Try in order):

### 1. **Check N8N Workflow Status**
   - Log into your N8N instance: `https://n8n.srv983857.hstgr.cloud/`
   - Navigate to each workflow
   - **Ensure the workflow toggle is ACTIVE/ON** (this is the most common issue)
   - Look for any red error indicators

### 2. **Verify Webhook Configuration**
   - In each workflow, check the Webhook node
   - Ensure the webhook path matches the URLs in the React app
   - Verify the HTTP method is set to POST
   - Check that "Respond to Webhook" option is enabled

### 3. **Test Production vs Test URLs**
   N8N has different endpoints:
   - **Test URL**: `https://n8n.srv983857.hstgr.cloud/webhook-test/...`
   - **Production URL**: `https://n8n.srv983857.hstgr.cloud/webhook/...`
   
   Make sure you're using the production URLs in your React app.

### 4. **Check N8N Server Status**
   - Verify the N8N server is running and accessible
   - Check server logs for any errors
   - Ensure adequate server resources (CPU, memory)

### 5. **Webhook URL Verification**
   Current webhook URLs in your app:
   ```
   Contract Comparison: /webhook/a027ab82-e53c-4246-9982-c41c79ac9bca
   Risk Analysis: /webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4
   Document Summarizer: /webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3
   Authenticity Checker: /webhook/ec8123eb-cee8-4ca3-a941-d499ed3f024d
   Compliance Generator: /webhook/compliance
   ```

## 🧪 Testing Commands

### PowerShell Test:
```powershell
.\test-webhooks-simple.ps1
```

### Manual Test (PowerShell):
```powershell
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca" -Method POST -ContentType "application/json" -Body '{}'
```

### cURL Test (if available):
```bash
curl -X POST "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 📋 Checklist

- [ ] N8N workflows are ACTIVE (most important!)
- [ ] Webhook nodes are properly configured
- [ ] Using production webhook URLs (not test URLs)
- [ ] N8N server is accessible and running
- [ ] No firewall/network blocks
- [ ] Adequate server resources

## 🔍 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 Not Found | Workflow not active | Activate workflow in N8N |
| 404 Not Found | Wrong webhook URL | Check webhook path in N8N |
| 404 Not Found | Using test URL instead of production | Use `/webhook/` not `/webhook-test/` |
| 500 Server Error | N8N workflow error | Check workflow logs |
| Timeout | Large file or slow processing | Increase timeout, optimize workflow |

## 📞 Next Steps

1. **Priority 1**: Check N8N dashboard and activate all workflows
2. **Priority 2**: Verify webhook URLs match between N8N and React app
3. **Priority 3**: Test with a simple HTTP client to confirm connectivity
4. **Priority 4**: Check N8N server logs if issues persist

Once workflows are active, the React application should work properly!