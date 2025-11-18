<?php

namespace App\Enums;

enum UserRole: string
{
    case CUSTOMER = 'customer';
    case MANAGER = 'manager';
    case ADMIN = 'admin';

    /**
     * Get the label for the role
     */
    public function label(): string
    {
        return match($this) {
            self::CUSTOMER => 'Customer',
            self::MANAGER => 'Manager',
            self::ADMIN => 'Admin',
        };
    }

    /**
     * Check if the role can access Filament panel
     */
    public function canAccessPanel(): bool
    {
        return in_array($this, [self::ADMIN, self::MANAGER]);
    }

    /**
     * Get all roles that can access the panel
     */
    public static function panelRoles(): array
    {
        return [self::ADMIN, self::MANAGER];
    }
}

