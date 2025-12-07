# 📘 CASE STUDY — FoodFusion (AI-Powered Expense Analyzer & Budget Prediction System)

## 🥗 Project Title  
**FoodFusion — Smart Expense Analysis & Budget Forecasting Dashboard**

---

## 📌 1. Problem Statement  
Managing daily expenses is time-consuming and often inaccurate when done manually.  
Most people depend on SMS logs, bank statements, and unstructured receipts — making it difficult to:

- Track spending patterns  
- Know category-wise expenditure  
- Predict upcoming expenses  
- Maintain monthly budgets  
- Visualize spending trends  

FoodFusion solves this by converting raw expense files into insights using AI.

---

## 🎯 2. Project Objective  
- Automatically parse **.txt, .csv, .json** expense files  
- Categorize each transaction: 🍔 Food, 🛍️ Shopping, 🚕 Travel, 💡 Bills, etc.  
- Display charts for easy visualization  
- Predict overspending dates using simple forecasting  
- Give personalized budget recommendations  
- Provide a smooth, fast, and responsive dashboard  

---

## 🧠 3. Solution Overview  
FoodFusion is a **full-stack intelligent dashboard** powered by an AI backend.

### **Frontend**
- React (Vite) → Fast UI  
- TailwindCSS → Clean and responsive  
- Recharts → Interactive visualizations  
- Framer Motion → Smooth transitions  
- React Router → Navigation  

### **Backend**
- FastAPI (Python)  
- Forecast using moving averages / Prophet  
- Smart rule-based auto-categorization  
- File parsing logic for txt/csv/json  

---

## 🌈 4. Key Features  

### 🔍 **1. File Upload & Parsing**
- Upload `.txt`, `.csv`, `.json`
- Extract: date, amount, merchant name
- Validate and normalize data

### 🏷️ **2. Auto-Categorization**
- Keyword-based detection  
- Categories include: Food, Travel, Bills, Shopping, Others

### 📊 **3. Interactive Dashboards**
- Line chart → Daily trends  
- Pie chart → Category distribution  
- Bar chart → Monthly summary  

### 🔔 **4. AI Predictions**
- Simple forecasting to predict overspending  
- Alerts like: *“Overspending expected in 9 days”*  
- Budget health score  

### ⭐ **5. Smart Recommendations**
- Based on last 30-day patterns  
- Spending control suggestions  
- Category-specific insights  

### 📱 **6. Responsive UI**
- Works on mobile/tablet/desktop  
- Animated transitions  

---

## 🏗️ 5. System Architecture  

```
 ┌────────────────────────┐
 │     React Frontend     │
 │  (Vite + TailwindCSS)  │
 └────────────┬───────────┘
              │ API Calls
 ┌────────────▼───────────┐
 │     FastAPI Backend    │
 │  Parsing + Category AI │
 │  Forecasting Model     │
 └────────────┬───────────┘
              │ Data
 ┌────────────▼───────────┐
 │       Database (Optional) │
 │    MySQL / MongoDB      │
 └─────────────────────────┘
```

---

## 🧪 6. Development Process  

### **Phase 1 — UI Design**
- Designed Home, Budget Prediction, Category Distribution, Daily Trend pages  
- Ensured responsive Tailwind-based UI  

### **Phase 2 — Backend API**
- File parser for CSV/JSON/TXT  
- Category classifier  
- Trend calculations + forecasting  

### **Phase 3 — Integration**
- Axios API calls  
- Rendering tables, charts, category insights  

### **Phase 4 — AI Enhancements**
- Added forecasting  
- Added recommendations based on patterns  

---

## 📈 7. Results & Insights  
FoodFusion successfully transforms unstructured data into meaningful insights:

| Insight | Example Output |
|--------|----------------|
| Daily Trend | ₹450 on 2025-01-22 |
| Top Category | Food – 27% |
| Budget Prediction | Overspending in 7 days |
| Smart Tip | Reduce weekend dine-outs |

This helps users make informed financial decisions.

---

## 🚀 8. Deployment  
- **Frontend** → Vercel  
- **Backend** → FastAPI (Render / Railway / Local)  

---

## 📂 9. Repository Structure  
```
FoodFusion/
│── backend/
│   ├── main.py
│   ├── requirements.txt
│── frontend/
│   ├── src/
│   ├── assets/
│   ├── components/
│── assets/
│── CASE_STUDY.md
│── README.md
```

---

## 👩‍💻 Author  
**Sandhiya M**  
- GitHub: https://github.com/Sandhiyamrs  
- Email: sandhiyamrs2006@gmail.com  

---

## ⭐ Support  
If you found this project helpful, **star ⭐ the repository**!

