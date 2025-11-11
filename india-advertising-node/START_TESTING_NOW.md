# 🚀 STEP-BY-STEP: Start Testing Full Project

## 📋 What You'll Do Today

```
1. Open 2 PowerShell windows (side by side)
2. Start Node.js backend in Window 1
3. Start React frontend in Window 2
4. Open browser and test
5. Learn how they work together
```

---

## 🖥️ WINDOW 1: Start Node.js Backend

### **Step 1: Open PowerShell**

- Windows key + R
- Type: `powershell`
- Press Enter

### **Step 2: Navigate to Node.js folder**

```powershell
cd "E:\advertising\india-advertising-node"
```

### **Step 3: Start the server**

```powershell
npm run dev
```

### **Step 4: Wait for message**

Look for:

```
API ready at http://localhost:5000
```

✅ **Done! Node.js is running on port 5000**

---

## 🖥️ WINDOW 2: Start React Frontend

### **Step 1: Open Another PowerShell**

- Windows key + R
- Type: `powershell`
- Press Enter

### **Step 2: Navigate to React folder**

```powershell
cd "E:\advertising\indiaadvertising"
```

### **Step 3: Start React**

```powershell
npm start
```

### **Step 4: Wait for browser**

React should automatically open `http://localhost:3000`

If not, open manually in your browser.

✅ **Done! React is running on port 3000**

---

## 🌐 NOW YOU HAVE BOTH RUNNING!

```
┌──────────────────────────────┐
│  Window 1                    │
│  Node.js (Port 5000)         │
│  API Server Running          │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Window 2                    │
│  React (Port 3000)           │
│  Website Running             │
└──────────────────────────────┘

     ↓ Browser sees React on 3000
     ↓ React calls API on 5000
     ↓ Both working together! ✅
```

---

## 🧪 TEST YOUR WEBSITE

### **Test 1: Browse Products**

- Look at homepage
- Products should load from Node.js API
- If you see product list → ✅ Working

### **Test 2: Check Admin Panel**

- Look for "Admin" or "Login" link
- Or go to: `http://localhost:3000/admin`
- Password: `admin123`

### **Test 3: Send Enquiry**

- Fill "Contact Us" or "Get Quote" form
- Click Send
- Check your email (check spam folder too)
- Email received? → ✅ Node.js email works

### **Test 4: Verify Data Source**

```powershell
# In a 3rd PowerShell window:
Invoke-RestMethod 'http://localhost:5000/api/getData' | ConvertTo-Json
```

This shows data coming from `data/companyData.json` (Node.js)

---

## 🔄 DATA FLOW

### **How They Work Together**

```
BROWSER (http://localhost:3000)
    ↓ User clicks "Products"
    ↓ React makes request
    ↓
NODE.JS (http://localhost:5000)
    ↓ Reads data/companyData.json
    ↓ Returns JSON response
    ↓
BROWSER
    ↓ React displays products
    ↓ ✅ User sees them
```

### **Email Flow**

```
BROWSER (User fills form)
    ↓ Submits to React
    ↓
REACT
    ↓ Sends to Node.js /api/sendQuote
    ↓
NODE.JS
    ↓ Uses Gmail (SMTP)
    ↓ Sends email
    ↓
GMAIL INBOX
    ↓ ✅ Email received
```

---

## ⏹️ WHEN YOU'RE DONE TESTING

### **Stop Node.js Server**

- Click in Window 1 (PowerShell)
- Press: `Ctrl + C`
- Type: `Y` and press Enter

### **Stop React Server**

- Click in Window 2 (PowerShell)
- Press: `Ctrl + C`
- Type: `Y` and press Enter

---

## 🐛 TROUBLESHOOTING

### **React shows "Cannot GET"**

- Check Node.js is running in Window 1
- Check port 5000 is listening
- Restart both servers

### **Products don't load**

- Check Node.js API is responding:

```powershell
Invoke-RestMethod 'http://localhost:5000/api/getData'
```

### **Email not sending**

- Check Gmail credentials in `.env`
- Use **App Password** (not regular password)
- Check internet connection

### **Port already in use**

```powershell
# Kill Node process:
Get-Process node | Stop-Process -Force

# Then try again
npm run dev
```

---

## 📊 QUICK REFERENCE

| Item          | Command                           | Location                              |
| ------------- | --------------------------------- | ------------------------------------- |
| Start Node.js | `npm run dev`                     | E:\advertising\india-advertising-node |
| Start React   | `npm start`                       | E:\advertising\indiaadvertising       |
| Node API      | http://localhost:5000/api/getData | Port 5000                             |
| React Site    | http://localhost:3000             | Port 3000                             |
| Stop Server   | Ctrl + C                          | In PowerShell                         |

---

## ✅ SUCCESS INDICATORS

✅ **All working if you see:**

1. **Window 1:** `API ready at http://localhost:5000`
2. **Window 2:** React page opens in browser
3. **Browser:** Products load on homepage
4. **Database:** companyData.json has all data
5. **Email:** Quote form sends emails
6. **API:** Manual test returns JSON data

---

## 🎯 NEXT: Delete PHP Files

When you're confident everything works:

```powershell
# DELETE PHP
Remove-Item "E:\advertising\indiaadvertising\api" -Recurse -Force
Remove-Item "E:\advertising\indiaadvertising\sendQuoteMail.php" -Force
Remove-Item "E:\advertising\indiaadvertising\admin.php" -Force
Remove-Item "E:\advertising\indiaadvertising\phpmailer" -Recurse -Force
```

✅ Then you're using 100% Node.js + React (no PHP!)

---

## 💡 KEY POINTS TO REMEMBER

1. **Two Servers:** Node.js (5000) + React (3000)
2. **Data Updates:** All go through Node.js now
3. **Email Works:** Via Node.js + Gmail
4. **No PHP Needed:** Node.js replaced it all
5. **Both Together:** Makes complete system

---

## 📞 NEED HELP?

Read these files in order:

1. **This file** - Quick setup
2. **ANSWER_TO_YOUR_QUESTIONS.md** - Q&A
3. **QUICK_START.md** - Quick reference
4. **LOCALHOST_TESTING.md** - Complete docs

---

**Ready? Start Window 1 now!** 🚀
