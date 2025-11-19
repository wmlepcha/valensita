# Valensita Setup Audit & Next Steps

## 📋 Current Status

### ✅ Completed
- [x] Repository cloned from GitHub
- [x] Composer dependencies installed (`composer install`)
- [x] PHP 8.4.14 installed (meets requirement: ^8.2)

### ❌ Missing/Required
- [ ] `.env` file (needs to be created from `.env.example`)
- [ ] Application key (needs to be generated)
- [ ] SQLite database file (needs to be created)
- [ ] Database migrations (need to be run)
- [ ] Node.js installed (required for frontend)
- [ ] NPM dependencies installed (`node_modules/`)
- [ ] Frontend assets built

---

## 🚀 Next Steps (In Order)

### Step 1: Create Environment File
```bash
cp .env.example .env
```

### Step 2: Generate Application Key
```bash
php artisan key:generate
```

### Step 3: Create SQLite Database
```bash
touch database/database.sqlite
```

**Note:** The project is configured to use SQLite by default (see `config/database.php`). If you prefer MySQL, update `.env` accordingly.

### Step 4: Run Database Migrations
```bash
php artisan migrate
```

This will create:
- `users` table (with role column)
- `cache` table
- `jobs` table
- `migrations` table

### Step 5: Install Node.js (if not installed)
Check if Node.js is installed:
```bash
node -v
npm -v
```

If not installed, install Node.js:
- **macOS**: `brew install node` or download from [nodejs.org](https://nodejs.org/)
- **Windows**: Download installer from [nodejs.org](https://nodejs.org/)
- **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian)

### Step 6: Install NPM Dependencies
```bash
npm install
```

### Step 7: Build Frontend Assets
For development:
```bash
npm run dev
```

For production:
```bash
npm run build
```

### Step 8: (Optional) Seed Test Users
```bash
php artisan db:seed --class=TestUsersSeeder
```

This creates:
- Admin: `admin@valensita.com` / `password`
- Manager: `manager@valensita.com` / `password`
- Manager: `assistant@valensita.com` / `password`
- 10 random customer users

Or create a single admin user:
```bash
php artisan make:filament-user
```

---

## 🎯 Quick Setup (All-in-One)

You can use the composer setup script:
```bash
composer run setup
```

This will:
1. Copy `.env.example` to `.env` (if doesn't exist)
2. Generate application key
3. Run migrations
4. Install npm dependencies
5. Build frontend assets

**Note:** You still need to:
- Create SQLite database: `touch database/database.sqlite`
- Install Node.js if not already installed

---

## 🏃 Running the Application

### Development Mode (Recommended)
```bash
composer run dev
```

This runs:
- Laravel server (`php artisan serve`)
- Queue worker
- Log viewer (Pail)
- Vite dev server

### Manual Start
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

Then visit:
- **Frontend**: http://127.0.0.1:8000
- **Admin Panel**: http://127.0.0.1:8000/sukaran

---

## 📊 Project Overview

### Tech Stack
- **Backend**: Laravel 12
- **Admin Panel**: Filament 3.2
- **Frontend**: React 18 + TypeScript + Inertia.js
- **Styling**: Tailwind CSS 3.4
- **Database**: SQLite (default) or MySQL

### Key Features
- ✅ Role-based access control (Admin, Manager, Customer)
- ✅ Filament admin panel at `/sukaran`
- ✅ React frontend with luxury streetwear design system
- ✅ Inertia.js for SPA-like experience

### Project Structure
```
app/
├── Enums/UserRole.php          # User role enum
├── Filament/Resources/         # Filament admin resources
├── Models/User.php             # User model with FilamentUser
└── Providers/Filament/        # Filament panel provider

resources/js/
├── Components/                 # React components
├── Layouts/                   # Layout components
├── Pages/                     # Inertia pages
└── types/                     # TypeScript types

database/
├── migrations/                # Database migrations
└── seeders/                   # Database seeders
```

---

## 🔐 Access Information

### Admin Panel
- **URL**: `/sukaran`
- **Access**: Admin and Manager roles only
- **Default Login** (after seeding):
  - Email: `admin@valensita.com`
  - Password: `password`

### User Roles
- **Admin**: Full access to Filament panel
- **Manager**: Access to Filament panel
- **Customer**: No access to admin panel (frontend only)

---

## ⚠️ Common Issues & Solutions

### Issue: "No application encryption key"
**Solution**: Run `php artisan key:generate`

### Issue: "SQLSTATE[HY000] [14] unable to open database file"
**Solution**: Create database file: `touch database/database.sqlite`

### Issue: "Command 'node' not found"
**Solution**: Install Node.js (see Step 5)

### Issue: "npm: command not found"
**Solution**: Install Node.js (npm comes with Node.js)

### Issue: "The stream or file could not be opened"
**Solution**: Fix permissions:
```bash
chmod -R 775 storage bootstrap/cache
```

### Issue: "Vite manifest not found"
**Solution**: Build assets: `npm run build` or run `npm run dev`

---

## 📝 Environment Configuration

### Default Settings (SQLite)
The `.env.example` is configured for SQLite:
```env
DB_CONNECTION=sqlite
```

### Switch to MySQL
If you prefer MySQL, update `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=valensita
DB_USERNAME=root
DB_PASSWORD=your_password
```

Then create the database:
```bash
mysql -u root -p -e "CREATE DATABASE valensita;"
php artisan migrate
```

---

## 🧪 Testing

Run tests:
```bash
php artisan test
```

Or use the composer script:
```bash
composer test
```

---

## 📚 Documentation Files

- `QUICKSTART.md` - Quick start guide for design system
- `DESIGN_SYSTEM.md` - Complete design system documentation
- `FRONTEND_README.md` - Frontend technical documentation
- `DEPLOYMENT_GUIDE.md` - Production deployment guide
- `ROLES_DOCUMENTATION.md` - Role system documentation
- `MIGRATION_STEPS.md` - Database migration guide

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `.env` file exists and has `APP_KEY` set
- [ ] `database/database.sqlite` exists (if using SQLite)
- [ ] Migrations ran successfully: `php artisan migrate:status`
- [ ] `node_modules/` directory exists
- [ ] Can access frontend: http://127.0.0.1:8000
- [ ] Can access admin panel: http://127.0.0.1:8000/sukaran
- [ ] Can log in with admin user

---

## 🎉 You're Ready!

Once all steps are complete, you can:
1. Start developing: `composer run dev`
2. Access admin panel: http://127.0.0.1:8000/sukaran
3. View frontend: http://127.0.0.1:8000
4. Read documentation files for more details

Happy coding! 🚀

