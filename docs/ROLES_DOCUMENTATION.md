# User Roles System - Valensita E-commerce

## Overview

Valensita uses a role-based access control (RBAC) system with three user roles:

1. **Customer** - Regular shoppers (no Filament access)
2. **Manager** - Store managers (Filament access)
3. **Admin** - System administrators (Filament access)

## Roles & Permissions

### Customer
- **Default role** for new users
- Can browse products and make purchases
- **Cannot** access Filament admin panel
- Frontend-only access

### Manager
- Can access Filament admin panel at `/sukaran`
- Manage products, orders, inventory
- Limited administrative capabilities
- Cannot modify other admin/manager accounts

### Admin
- Full access to Filament admin panel
- Can manage all users, including managers
- Full system configuration access
- Highest privilege level

## Implementation Details

### User Role Enum

The roles are defined in `app/Enums/UserRole.php`:

```php
enum UserRole: string
{
    case CUSTOMER = 'customer';
    case MANAGER = 'manager';
    case ADMIN = 'admin';
}
```

### Database Schema

The `users` table includes a `role` column:

```sql
role VARCHAR(255) DEFAULT 'customer' INDEX
```

### User Model Methods

The `User` model includes helper methods:

```php
// Check panel access
$user->canAccessPanel($panel); // true for admin/manager

// Role checks
$user->isAdmin();     // true if role is admin
$user->isManager();   // true if role is manager
$user->isCustomer();  // true if role is customer

// Get role label
$user->role->label(); // "Admin", "Manager", or "Customer"
```

## Creating Users

### Method 1: Interactive Script

```bash
php create_user.php
```

Follow the prompts to create a user with any role.

### Method 2: Using Factory (for testing)

```php
use App\Models\User;

// Create customer (default)
$customer = User::factory()->create();

// Create manager
$manager = User::factory()->manager()->create([
    'email' => 'manager@example.com',
]);

// Create admin
$admin = User::factory()->admin()->create([
    'email' => 'admin@example.com',
]);
```

### Method 3: Manual Creation

```php
use App\Models\User;
use App\Enums\UserRole;

$user = User::create([
    'name' => 'John Manager',
    'email' => 'john@valensita.com',
    'password' => bcrypt('password'),
    'role' => UserRole::MANAGER,
]);
```

### Method 4: Artisan Tinker

```bash
php artisan tinker
```

```php
User::create([
    'name' => 'Jane Admin',
    'email' => 'jane@valensita.com',
    'password' => bcrypt('password'),
    'role' => App\Enums\UserRole::ADMIN,
]);
```

## Viewing Users

### List All Users with Roles

```bash
php list_users_with_roles.php
```

### In Tinker

```bash
php artisan tinker
```

```php
// All users
User::all(['id', 'name', 'email', 'role']);

// Admins only
User::where('role', 'admin')->get();

// Panel access users (admin + manager)
User::whereIn('role', ['admin', 'manager'])->get();
```

## Updating User Roles

### Via Tinker

```bash
php artisan tinker
```

```php
$user = User::where('email', 'user@example.com')->first();
$user->role = App\Enums\UserRole::MANAGER;
$user->save();
```

### Via Script

```php
use App\Models\User;
use App\Enums\UserRole;

$user = User::find(1);
$user->update(['role' => UserRole::ADMIN]);
```

## Filament Panel Access

### Current Setup

Only **Admin** and **Manager** roles can access the Filament panel.

The `canAccessPanel()` method in the `User` model handles this:

```php
public function canAccessPanel(Panel $panel): bool
{
    return $this->role->canAccessPanel();
}
```

### Access Points

- **URL**: `http://yourdomain.com/sukaran`
- **Local**: `http://127.0.0.1:8000/sukaran`

## Security Best Practices

1. **Default Role**: All new users are customers by default
2. **Explicit Assignment**: Admin/Manager roles must be explicitly assigned
3. **Password Security**: Always use strong passwords for admin/manager accounts
4. **Audit Trail**: Consider adding logging for role changes

## Future Enhancements

### Possible Features to Add:

1. **Permissions System**: Granular permissions for managers
2. **Role Hierarchy**: More detailed role structure
3. **Activity Logging**: Track admin/manager actions
4. **Two-Factor Auth**: Extra security for admin accounts
5. **Role-Based Dashboard**: Different dashboards per role

## Testing

### Create Test Users

```php
// In DatabaseSeeder.php or a dedicated seeder
User::factory()->admin()->create([
    'email' => 'admin@test.com',
]);

User::factory()->manager()->count(2)->create();
User::factory()->customer()->count(10)->create();
```

### Test Access Control

```php
$customer = User::factory()->customer()->create();
$manager = User::factory()->manager()->create();
$admin = User::factory()->admin()->create();

// Should be false
$customer->canAccessPanel(app(Panel::class));

// Should be true
$manager->canAccessPanel(app(Panel::class));
$admin->canAccessPanel(app(Panel::class));
```

## Troubleshooting

### User Can't Access Filament Panel

1. Check user role: `User::find($id)->role`
2. Verify role is `admin` or `manager`
3. Clear cache: `php artisan config:clear`
4. Check panel configuration in `app/Providers/Filament/SukaranPanelProvider.php`

### Migration Issues

If role column is missing:

```bash
php artisan migrate:status
php artisan migrate
```

### Existing Users Have No Role

Update existing users:

```php
User::whereNull('role')->update(['role' => 'customer']);
```

## Quick Reference

| Role     | Filament Access | Default | Use Case              |
|----------|----------------|---------|------------------------|
| Customer | ❌             | ✅      | Regular shoppers       |
| Manager  | ✅             | ❌      | Store management       |
| Admin    | ✅             | ❌      | System administration  |

## Current Users

You currently have:

- **1 Admin**: admin@valensita.com (password: 123456)
- **0 Managers**
- **0 Customers**

## Need Help?

- Check logs: `storage/logs/laravel.log`
- List users: `php list_users_with_roles.php`
- Create user: `php create_user.php`

