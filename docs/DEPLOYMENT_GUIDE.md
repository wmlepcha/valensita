# Valensita Deployment Guide - Hostinger MySQL

## Pre-Deployment Checklist

- [ ] All migrations are committed to Git
- [ ] Filament User model implements FilamentUser interface ✅ (Already done)
- [ ] Test your app locally to ensure everything works
- [ ] Prepare your Hostinger MySQL credentials

## Step 1: Create MySQL Database on Hostinger

1. Log into Hostinger cPanel
2. Navigate to **MySQL Databases**
3. Create a new database (e.g., `u123456789_valensita`)
4. Create a database user with a strong password
5. Add the user to the database with ALL PRIVILEGES
6. **Note down these credentials:**
   - Database name
   - Database username
   - Database password
   - Host (usually `localhost`)

## Step 2: Upload Project Files

### Option A: FTP/File Manager
1. Upload all project files EXCEPT:
   - `.env` file
   - `node_modules/` folder
   - `.git/` folder (if large)
   
### Option B: Git (Recommended)
1. Push your code to GitHub/GitLab
2. Use SSH to clone on Hostinger
3. Or use Hostinger's Git deployment feature

## Step 3: Install Dependencies

Connect via SSH and run:

```bash
cd public_html/your-project-folder
composer install --optimize-autoloader --no-dev
```

## Step 4: Configure Environment

Create a new `.env` file on Hostinger with these settings:

```env
APP_NAME=Valensita
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Hostinger MySQL Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_valensita
DB_USERNAME=u123456789_valensita_user
DB_PASSWORD=your_secure_password

# Use database for these (important for shared hosting)
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

# Cache
CACHE_PREFIX=valensita_cache_

# Logging (reduce to errors only in production)
LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=error
```

## Step 5: Generate Application Key

```bash
php artisan key:generate
```

## Step 6: Run Database Migrations

```bash
php artisan migrate --force
```

This will create all your tables in the MySQL database.

## Step 7: Set File Permissions

```bash
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage/logs
```

## Step 8: Optimize for Production

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize Filament
php artisan filament:optimize

# Create storage link
php artisan storage:link
```

## Step 9: Create Admin User

```bash
php artisan make:filament-user
```

Follow the prompts to create your first admin user.

## Step 10: Configure Web Server

Make sure your web server points to the `public` folder.

**In Hostinger cPanel:**
1. Go to **Advanced** → **Subdomains** or **Domains**
2. Set the document root to: `/home/username/public_html/your-project/public`

## Step 11: Test Your Application

1. Visit your domain
2. Navigate to `/sukaran` to access Filament admin panel
3. Log in with the credentials you created

## Troubleshooting

### 500 Internal Server Error
- Check `storage/logs/laravel.log` for errors
- Ensure `.env` file exists and is configured correctly
- Verify file permissions: `chmod -R 755 storage bootstrap/cache`
- Clear cache: `php artisan cache:clear && php artisan config:clear`

### Database Connection Errors
- Verify MySQL credentials in `.env`
- Check if database user has correct privileges
- Ensure `DB_HOST` is `localhost` (or check with Hostinger support)

### Can't Access Filament Panel
- Verify User model implements `FilamentUser` interface ✅
- Ensure admin user was created successfully
- Check if migrations ran successfully: `php artisan migrate:status`

### "No input file specified" Error
- Document root must point to `public` folder
- Check `.htaccess` file exists in `public` folder

### Permission Denied Errors
```bash
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage/logs
```

## Local Development vs Production

You can maintain different databases for each environment:

**Local (.env):**
```env
DB_CONNECTION=sqlite
```

**Production (.env on Hostinger):**
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=...
```

Laravel automatically uses the correct database based on the environment!

## Data Migration (If Needed)

If you need to move data from local SQLite to production MySQL:

1. Export data using seeders
2. Run seeders on production
3. Or manually export/import through phpMyAdmin

## Maintenance Mode

To put your site in maintenance mode during updates:

```bash
php artisan down --secret="your-secret-token"
```

Access with: `https://yourdomain.com/your-secret-token`

To bring it back up:
```bash
php artisan up
```

## Security Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] Strong `APP_KEY` generated
- [ ] Strong database password
- [ ] `.env` file is NOT in Git
- [ ] File permissions are correct
- [ ] Only `public` folder is web-accessible

## Post-Deployment

- Test all features thoroughly
- Monitor `storage/logs/laravel.log` for errors
- Set up backups in Hostinger
- Consider setting up automated deployments

---

**Need Help?**
- Hostinger Support: For server/hosting issues
- Laravel Docs: https://laravel.com/docs
- Filament Docs: https://filamentphp.com/docs

