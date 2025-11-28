# Step-by-Step: Migrate from SQLite to MySQL

## Current Status
✅ You have 3 users in SQLite that need to be migrated:
- Admin (admin@admin.com)
- manager (manager@valensita.com)
- manager@valensita.com (admin@valensita.com)

## Step 1: Update .env File

Open your `.env` file and change these lines:

**FROM:**
```env
DB_CONNECTION=sqlite
```

**TO:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=valensita
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

*(Replace `your_mysql_password` with your actual MySQL password, or leave empty if no password)*

## Step 2: Clear Config Cache

```bash
php artisan config:clear
```

## Step 3: Test MySQL Connection

```bash
php test_mysql_connection.php
```

You should see: `✓ SUCCESS! Connected to MySQL database!`

## Step 4: Run Migrations (Create Tables in MySQL)

```bash
php artisan migrate
```

This will create all the necessary tables in your MySQL database.

## Step 5: Migrate Your Users

```bash
php migrate_users_to_mysql.php
```

This will:
- Copy all 3 users from SQLite to MySQL
- Preserve their passwords (they'll work as-is)
- Skip any users that already exist (by email)

## Step 6: Verify Everything Works

```bash
php artisan tinker
```

Then in tinker:
```php
\App\Models\User::count(); // Should show 3
\App\Models\User::all(['id', 'name', 'email']);
```

## Step 7: Test Login

1. Start your server: `php artisan serve`
2. Go to: `http://127.0.0.1:8000/sukaran`
3. Try logging in with one of your migrated users

## Step 8: (Optional) Backup SQLite

Before removing SQLite, create a backup:

```bash
copy database\database.sqlite database\database.sqlite.backup
```

## Step 9: (Optional) Remove SQLite

Once you've verified everything works with MySQL, you can:
- Keep SQLite as backup (recommended)
- Or delete it: `del database\database.sqlite`

---

## Troubleshooting

### "Cannot connect to MySQL"
- Check MySQL is running
- Verify username/password in .env
- Test connection: `mysql -u root -p`

### "Table doesn't exist"
- Run: `php artisan migrate`

### "Duplicate entry" error
- The script will skip users that already exist
- Or clear MySQL users first if you want fresh migration

### Users can't log in
- Passwords are preserved, they should work
- If issues, you can reset: `php artisan make:filament-user`

---

## What Gets Migrated?

✅ **Migrated:**
- Users table (all 3 users with passwords)

❌ **Not Migrated (by design):**
- Sessions (will be recreated as users log in)
- Cache (will be regenerated)
- Migrations table (will be recreated by `php artisan migrate`)

---

## Need Help?

If you encounter any issues, check:
1. `storage/logs/laravel.log` for errors
2. MySQL is running and accessible
3. Database `valensita` exists in MySQL

