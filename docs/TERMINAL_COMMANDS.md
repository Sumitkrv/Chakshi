# Terminal Commands for Chakshi Legal Intelligence Platform

## 🚀 START APPLICATION

### 1. Start React Development Server
```powershell
npm start
```
- Opens browser at: http://localhost:3000
- Hot reload enabled for development
- Press Ctrl+C to stop

### 2. Start with specific port (if 3000 is busy)
```powershell
$env:PORT=3001; npm start
```

## 🧪 WEBHOOK TESTING

### 1. Test All Webhooks (Simple)
```powershell
.\test-webhooks-simple.ps1
```

### 2. Test Individual Webhook
```powershell
# Contract Comparison
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca" -Method POST -ContentType "application/json" -Body '{}'

# Risk Analysis  
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4" -Method POST -ContentType "application/json" -Body '{}'

# Document Summarizer
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3" -Method POST -ContentType "application/json" -Body '{}'

# Authenticity Checker
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/ec8123eb-cee8-4ca3-a941-d499ed3f024d" -Method POST -ContentType "application/json" -Body '{}'

# Compliance Generator
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/compliance" -Method POST -ContentType "application/json" -Body '{}'
```

### 3. Test Webhook with File Upload (PowerShell)
```powershell
# Create test multipart form data
$boundary = [System.Guid]::NewGuid().ToString()
$bodyLines = @(
    "--$boundary",
    'Content-Disposition: form-data; name="file1"; filename="test.txt"',
    'Content-Type: text/plain',
    '',
    'This is test content',
    "--$boundary--"
)
$body = $bodyLines -join "`r`n"

# Send request
Invoke-WebRequest -Uri "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca" -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body $body
```

## 🛠️ DEVELOPMENT COMMANDS

### 1. Install Dependencies
```powershell
npm install
```

### 2. Build for Production
```powershell
npm run build
```

### 3. Check for Updates
```powershell
npm outdated
```

### 4. Update Dependencies
```powershell
npm update
```

## 🔍 DEBUGGING COMMANDS

### 1. Check Node/NPM Versions
```powershell
node --version
npm --version
```

### 2. Clear NPM Cache
```powershell
npm cache clean --force
```

### 3. Reinstall Node Modules
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 4. Check Running Processes
```powershell
# Check if React app is running
Get-Process -Name "node" -ErrorAction SilentlyContinue

# Check port usage
netstat -ano | findstr :3000
```

## 🌐 NETWORK TESTING

### 1. Test Internet Connectivity
```powershell
Test-NetConnection -ComputerName "google.com" -Port 443
```

### 2. Test N8N Server Connectivity
```powershell
Test-NetConnection -ComputerName "n8n.srv983857.hstgr.cloud" -Port 443
```

### 3. DNS Lookup
```powershell
Resolve-DnsName "n8n.srv983857.hstgr.cloud"
```

## 📂 FILE OPERATIONS

### 1. Create Test PDF Files
```powershell
# Create dummy text files for testing
"Test contract content 1" | Out-File -FilePath "test-contract1.txt"
"Test contract content 2" | Out-File -FilePath "test-contract2.txt"
```

### 2. List Project Files
```powershell
Get-ChildItem -Recurse -Name "*.jsx" | Select-Object -First 10
```

### 3. Find Large Files
```powershell
Get-ChildItem -Recurse | Where-Object {$_.Length -gt 10MB} | Select-Object Name, Length
```

## 🚨 EMERGENCY COMMANDS

### 1. Kill All Node Processes
```powershell
Get-Process -Name "node" | Stop-Process -Force
```

### 2. Reset Development Environment
```powershell
# Stop all processes
Get-Process -Name "node" | Stop-Process -Force

# Clean install
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install

# Start fresh
npm start
```

## 📊 MONITORING COMMANDS

### 1. Monitor File Changes
```powershell
# Watch for file changes in src directory
Get-ChildItem -Path ".\src" -Recurse -File | Select-Object Name, LastWriteTime
```

### 2. Check Memory Usage
```powershell
Get-Process -Name "node" | Select-Object Name, CPU, WorkingSet
```

## 🎯 QUICK START SEQUENCE

```powershell
# 1. Start React app
npm start

# 2. In another terminal, test webhooks
.\test-webhooks-simple.ps1

# 3. Open browser manually if it doesn't auto-open
Start-Process "http://localhost:3000"
```

## 📋 USEFUL ALIASES (Optional)

Add these to your PowerShell profile for quick access:

```powershell
# Add to $PROFILE
function Start-ReactApp { npm start }
function Test-Webhooks { .\test-webhooks-simple.ps1 }
function Open-ReactApp { Start-Process "http://localhost:3000" }

Set-Alias -Name "react" -Value Start-ReactApp
Set-Alias -Name "test-hooks" -Value Test-Webhooks
Set-Alias -Name "open-app" -Value Open-ReactApp
```