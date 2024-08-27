#!/bin/bash

# Define the base project directory
BASE_DIR="backend"

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
create_dir "$BASE_DIR/config"
create_dir "$BASE_DIR/controllers"
create_dir "$BASE_DIR/middleware"
create_dir "$BASE_DIR/models"
create_dir "$BASE_DIR/routes"
create_dir "$BASE_DIR/services"
create_dir "$BASE_DIR/utils"
create_dir "$BASE_DIR/tests"

# Create empty files as specified
create_file "$BASE_DIR/config/database.js"
create_file "$BASE_DIR/config/auth.js"
create_file "$BASE_DIR/controllers/authController.js"
create_file "$BASE_DIR/controllers/userController.js"
create_file "$BASE_DIR/middleware/authMiddleware.js"
create_file "$BASE_DIR/middleware/errorMiddleware.js"
create_file "$BASE_DIR/models/User.js"
create_file "$BASE_DIR/routes/authRoutes.js"
create_file "$BASE_DIR/routes/userRoutes.js"
create_file "$BASE_DIR/services/emailService.js"
create_file "$BASE_DIR/utils/validators.js"
create_file "$BASE_DIR/utils/helpers.js"
create_file "$BASE_DIR/tests/auth.test.js"
create_file "$BASE_DIR/tests/user.test.js"
create_file "$BASE_DIR/.env"
create_file "$BASE_DIR/.gitignore"
create_file "$BASE_DIR/package.json"
create_file "$BASE_DIR/server.js"
create_file "$BASE_DIR/README.md"

echo "Backend project structure modified successfully!"
