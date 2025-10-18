# API Testing Commands for Document Processing

## Prerequisites
Make sure you have curl installed and sample PDF files available.

## 1. CONTRACT COMPARISON TOOL
# Create sample PDF files for testing
echo "Sample contract 1 content" > contract1.txt
echo "Sample contract 2 content" > contract2.txt

# Convert to PDF (if you have pandoc installed)
# pandoc contract1.txt -o contract1.pdf
# pandoc contract2.txt -o contract2.pdf

# Test command (replace with actual PDF files):
curl -X POST https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca \
  -H "Content-Type: multipart/form-data" \
  -F "file1=@contract1.pdf" \
  -F "file2=@contract2.pdf" \
  -v

## 2. CONTRACT RISK ANALYSIS
curl -X POST https://n8n.srv983857.hstgr.cloud/webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4 \
  -H "Content-Type: multipart/form-data" \
  -F "file1=@contract1.pdf" \
  -v

## 3. DOCUMENT SUMMARIZER  
curl -X POST https://n8n.srv983857.hstgr.cloud/webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3 \
  -H "Content-Type: multipart/form-data" \
  -F "file1=@contract1.pdf" \
  -v

## 4. TASK GENERATOR (COMPLIANCE)
curl -X POST "https://n8n.srv983857.hstgr.cloud/webhook/compliance" \
  -H "Content-Type: application/json" \
  -d '{
    "Regulation": "labor law",
    "Country": "INDIA",
    "CompanyType": "justice"
  }' \
  -v

## Alternative test with different parameters:
curl -X POST "https://n8n.srv983857.hstgr.cloud/webhook/compliance" \
  -H "Content-Type: application/json" \
  -d '{
    "Regulation": "data protection",
    "Country": "USA",
    "CompanyType": "technology"
  }' \
  -v

## Windows PowerShell Commands (alternative syntax)

# For file uploads in PowerShell:
# Invoke-RestMethod -Uri "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca" -Method POST -InFile "contract1.pdf" -ContentType "multipart/form-data"

# For JSON requests in PowerShell:
# $body = @{
#     Regulation = "labor law"
#     Country = "INDIA"
#     CompanyType = "justice"
# } | ConvertTo-Json
# 
# Invoke-RestMethod -Uri "https://n8n.srv983857.hstgr.cloud/webhook/compliance" -Method POST -Body $body -ContentType "application/json"

## Testing Notes:
# 1. Replace sample files with actual PDF documents
# 2. Check API responses for expected data structure
# 3. Verify all endpoints are accessible and return valid responses
# 4. Test error handling with invalid files or parameters