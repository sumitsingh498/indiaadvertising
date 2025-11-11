#!/usr/bin/env pwsh
# Test Script for India Advertising Node.js Backend

Clear-Host

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  India Advertising - Node.js Backend Test Suite" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000"
$testsPassed = 0
$testsFailed = 0

# Check if server is running
Write-Host "Checking if server is running on $baseUrl..." -ForegroundColor Yellow
$portCheck = netstat -ano 2>$null | Select-String ":5000" | Select-String "LISTENING"

if ($portCheck) {
    Write-Host "[OK] Server is listening on port 5000" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host "[FAIL] Server is NOT listening on port 5000" -ForegroundColor Red
    Write-Host "Please start the server: .\START_SERVER.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "====== Testing Endpoints ======" -ForegroundColor Cyan
Write-Host ""

# Test 1: Get Data
Write-Host "Test 1: GET /api/getData..." -ForegroundColor Yellow
try {
    $data = Invoke-RestMethod "$baseUrl/api/getData"
    Write-Host "[OK] Data retrieved successfully" -ForegroundColor Green
    Write-Host "  - Categories: $($data.categories.Count)" -ForegroundColor White
    Write-Host "  - Gallery Items: $($data.gallery.Count)" -ForegroundColor White
    Write-Host "  - Clients: $($data.clients.Count)" -ForegroundColor White
    $testsPassed++
} catch {
    Write-Host "[FAIL] Could not retrieve data" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

Write-Host ""

# Test 2: PHP Compatibility
Write-Host "Test 2: GET /api/getData.php (PHP compat)..." -ForegroundColor Yellow
try {
    $data = Invoke-RestMethod "$baseUrl/api/getData.php"
    Write-Host "[OK] PHP compatibility route works" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "[FAIL] PHP compatibility route failed" -ForegroundColor Red
    $testsFailed++
}

Write-Host ""

# Test 3: Send Quote
Write-Host "Test 3: POST /api/sendQuote..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        mobile = "+91 9876543210"
        email = "test@example.com"
        message = "Test message"
        product = "Sign Board"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/sendQuote" -Method Post -Body $body -ContentType 'application/json'
    Write-Host "[OK] Quote endpoint working" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "[FAIL] Quote endpoint failed" -ForegroundColor Red
    $testsFailed++
}

Write-Host ""

# Test 4: Admin - Wrong Password
Write-Host "Test 4: Admin auth - Wrong password rejection..." -ForegroundColor Yellow
try {
    $body = @{
        password = 'wrongpass'
        action = 'addCategory'
        category = '{"category":"Test","subProducts":[]}'
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/updateData" -Method Post -Body $body -ContentType 'application/json' -ErrorAction Stop
    
    Write-Host "[FAIL] Did not reject wrong password" -ForegroundColor Red
    $testsFailed++
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "[OK] Wrong password correctly rejected (401)" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "[FAIL] Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
}

Write-Host ""

# Test 5: Admin - Correct Password
Write-Host "Test 5: Admin auth - Valid password..." -ForegroundColor Yellow
try {
    $body = @{
        password = 'admin123'
        action = 'addCategory'
        category = '{"category":"Test Cat","subProducts":[]}'
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/updateData" -Method Post -Body $body -ContentType 'application/json'
    
    if ($response.success -or $response.message) {
        Write-Host "[OK] Admin authentication working" -ForegroundColor Green
        $testsPassed++
    }
} catch {
    Write-Host "[FAIL] Admin authentication failed" -ForegroundColor Red
    $testsFailed++
}

Write-Host ""
Write-Host "====== TEST RESULTS ======" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tests Passed: " -NoNewline
Write-Host $testsPassed -ForegroundColor Green
Write-Host "Tests Failed: " -NoNewline
if ($testsFailed -gt 0) {
    Write-Host $testsFailed -ForegroundColor Red
} else {
    Write-Host $testsFailed -ForegroundColor Green
}
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "SUCCESS! All tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your server is ready to use:" -ForegroundColor Green
    Write-Host "  API URL: $baseUrl" -ForegroundColor White
    Write-Host "  Admin Password: admin123" -ForegroundColor White
    Write-Host ""
    Write-Host "Documentation:" -ForegroundColor Yellow
    Write-Host "  - QUICK_START.md" -ForegroundColor White
    Write-Host "  - LOCALHOST_TESTING.md" -ForegroundColor White
    exit 0
} else {
    Write-Host "FAILURE! Some tests failed." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check server is running" -ForegroundColor White
    Write-Host "  2. Verify .env configuration" -ForegroundColor White
    Write-Host "  3. Check server console for errors" -ForegroundColor White
    exit 1
}
