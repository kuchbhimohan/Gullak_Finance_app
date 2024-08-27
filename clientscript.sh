#!/bin/bash

# Define the base project directory
BASE_DIR="client"

# Function to create directories if they don't exist
create_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
  fi
}

# Function to create files if they don't exist
create_file() {
  if [ ! -f "$1" ]; then
    touch "$1"
  fi
}

# Create the necessary directories
create_dir "$BASE_DIR/public"
create_dir "$BASE_DIR/src/components/common"
create_dir "$BASE_DIR/src/components/home"
create_dir "$BASE_DIR/src/components/auth"
create_dir "$BASE_DIR/src/components/dashboard"
create_dir "$BASE_DIR/src/components/ai"
create_dir "$BASE_DIR/src/pages"
create_dir "$BASE_DIR/src/services"
create_dir "$BASE_DIR/src/utils"
create_dir "$BASE_DIR/src/hooks"
create_dir "$BASE_DIR/src/context"
create_dir "$BASE_DIR/src/styles"

# Create empty files as specified
create_file "$BASE_DIR/Dockerfile"
create_file "$BASE_DIR/package.json"
create_file "$BASE_DIR/public/index.html"
create_file "$BASE_DIR/public/favicon.ico"
create_file "$BASE_DIR/public/manifest.json"
create_file "$BASE_DIR/src/components/common/Navbar.js"
create_file "$BASE_DIR/src/components/common/Footer.js"
create_file "$BASE_DIR/src/components/common/Loading.js"
create_file "$BASE_DIR/src/components/common/ErrorBoundary.js"
create_file "$BASE_DIR/src/components/home/NewsCard.js"
create_file "$BASE_DIR/src/components/home/StockTicker.js"
create_file "$BASE_DIR/src/components/home/MarketSummary.js"
create_file "$BASE_DIR/src/components/auth/LoginForm.js"
create_file "$BASE_DIR/src/components/auth/SignupForm.js"
create_file "$BASE_DIR/src/components/dashboard/ExpenseForm.js"
create_file "$BASE_DIR/src/components/dashboard/IncomeForm.js"
create_file "$BASE_DIR/src/components/dashboard/FinancialSummary.js"
create_file "$BASE_DIR/src/components/dashboard/ChartContainer.js"
create_file "$BASE_DIR/src/components/ai/ChatInterface.js"
create_file "$BASE_DIR/src/pages/HomePage.js"
create_file "$BASE_DIR/src/pages/LoginPage.js"
create_file "$BASE_DIR/src/pages/SignupPage.js"
create_file "$BASE_DIR/src/pages/DashboardPage.js"
create_file "$BASE_DIR/src/services/api.js"
create_file "$BASE_DIR/src/services/auth.js"
create_file "$BASE_DIR/src/services/news.js"
create_file "$BASE_DIR/src/services/finance.js"
create_file "$BASE_DIR/src/services/ai.js"
create_file "$BASE_DIR/src/utils/formatters.js"
create_file "$BASE_DIR/src/utils/validators.js"
create_file "$BASE_DIR/src/hooks/useAuth.js"
create_file "$BASE_DIR/src/hooks/useFinancialData.js"
create_file "$BASE_DIR/src/context/AuthContext.js"
create_file "$BASE_DIR/src/styles/global.css"
create_file "$BASE_DIR/src/styles/variables.css"
create_file "$BASE_DIR/src/App.js"
create_file "$BASE_DIR/src/index.js"
create_file "$BASE_DIR/src/Routes.js"
create_file "$BASE_DIR/.env"
create_file "$BASE_DIR/.gitignore"

echo "Client project structure modified successfully!"
