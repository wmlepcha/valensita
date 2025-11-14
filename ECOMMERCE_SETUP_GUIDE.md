# Complete Guide: Building an E-commerce Application with Laravel, React, Inertia.js, and Filament

This comprehensive guide will walk you through creating a full-featured e-commerce application from scratch using Laravel (backend), React (frontend), Inertia.js (bridge), and Filament (admin dashboard).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Laravel Project](#step-1-create-laravel-project)
3. [Step 2: Install and Configure Inertia.js](#step-2-install-and-configure-inertiajs)
4. [Step 3: Set Up React with Vite](#step-3-set-up-react-with-vite)
5. [Step 4: Install and Configure Filament](#step-4-install-and-configure-filament)
6. [Step 5: Database Setup](#step-5-database-setup)
7. [Step 6: Create E-commerce Models and Migrations](#step-6-create-e-commerce-models-and-migrations)
8. [Step 7: Set Up Authentication](#step-7-set-up-authentication)
9. [Step 8: Create Filament Resources](#step-8-create-filament-resources)
10. [Step 9: Build Frontend Components](#step-9-build-frontend-components)
11. [Step 10: Create Controllers and Routes](#step-10-create-controllers-and-routes)
12. [Step 11: Testing and Running the Application](#step-11-testing-and-running-the-application)

---

## Prerequisites

Before starting, ensure you have the following installed:

- **PHP** 8.2 or higher
- **Composer** (PHP package manager)
- **Node.js** 18.x or higher and **npm**
- **MySQL** or **PostgreSQL** database
- **Git** (optional but recommended)

### Verify Installations

```bash
# Check PHP version
php -v

# Check Composer version
composer --version

# Check Node.js version
node -v

# Check npm version
npm -v

# Check MySQL version (if using MySQL)
mysql --version
```

---

## Step 1: Create Laravel Project

### 1.1 Create a new Laravel project

```bash
# Navigate to your desired directory
cd /Users/wilburlepcha/Herd

# Create new Laravel project
composer create-project laravel/laravel ecommerce-app

# Navigate into the project directory
cd ecommerce-app
```

### 1.2 Set up environment configuration

```bash
# Copy the environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 1.3 Configure database in `.env` file

Open `.env` file and update the database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 1.4 Create the database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit MySQL
exit;
```
---
## Step 2: Install and Configure Inertia.js

### 2.1 Install Inertia.js server-side package
```bash
composer require inertiajs/inertia-laravel
```

### 2.2 Generate Inertia middleware
```bash
php artisan inertia:middleware
```

### 2.3 Register the middleware (Laravel 12+ via bootstrap/app.php)
Open `bootstrap/app.php` and append the middleware to the `web` group:

```php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->create();
```

Note: Do not edit `app/Http/Kernel.php` in Laravel 12.

### 2.4 Create the Inertia root template (Blade)
Create `resources/views/app.blade.php`:

```bash
mkdir -p resources/views
```

```blade
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @viteReactRefresh
    @vite('resources/js/app.tsx') {{-- if using JS, change to app.jsx --}}
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
```

---

## Step 3: Set Up React with Vite (TypeScript-first)

Pick ONE path.

### Option A — Breeze (recommended, fastest)
```bash
composer require laravel/breeze --dev
php artisan breeze:install react --typescript
npm install
npm run dev
php artisan serve
```

This scaffolds TypeScript + React + Inertia, Vite config, Blade root, and auth views/routes.
You can proceed to Filament (Step 4) after this.

### Option B — Manual TypeScript setup

#### 3.1 Install client packages
```bash
npm i react react-dom @inertiajs/react
npm i -D typescript @types/node @types/react @types/react-dom vite @vitejs/plugin-react laravel-vite-plugin
```

#### 3.2 Create tsconfig
```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["resources/js/*"] },
    "types": ["vite/client"]
  },
  "include": ["resources/**/*", "vite.config.ts"]
}
EOF
```

#### 3.3 Create Vite config (TypeScript)
```bash
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
});
EOF
```

#### 3.4 Create entry files
```bash
mkdir -p resources/js resources/css resources/js/Pages
```

`resources/js/bootstrap.ts`:
```bash
cat > resources/js/bootstrap.ts << 'EOF'
import axios from 'axios';
(window as any).axios = axios;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
EOF
```

`resources/js/app.tsx`:
```bash
cat > resources/js/app.tsx << 'EOF'
import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: { color: '#4B5563' },
});
EOF
```

`resources/css/app.css`:
```bash
cat > resources/css/app.css << 'EOF'
/* Tailwind optional; placeholder CSS */
body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
EOF
```

#### 3.5 Sample page and route
```bash
cat > resources/js/Pages/Welcome.tsx << 'EOF'
import { Head } from '@inertiajs/react';

export default function Welcome() {
  return (
    <>
      <Head title="Welcome" />
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h1>Laravel + Inertia + React (TypeScript)</h1>
      </div>
    </>
  );
}
EOF
```

Update `routes/web.php`:
```php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
```

#### 3.6 Run dev servers
```bash
npm install
npm run dev
php artisan optimize:clear
php artisan serve
```