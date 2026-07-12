<?php

namespace App\Console\Commands;

use App\Models\Admin;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('admin:reset-password')]
#[Description('Reset the admin password to ADMIN_PASSWORD from .env. Always overwrites - use only when the admin forgot their password.')]
class ResetAdminPasswordCommand extends Command
{
    public function handle(): int
    {
        $username = config('app.admin_username', 'admin');
        $password = config('app.admin_password', 'nofei-nechemia-2026');

        $admin = Admin::updateOrCreate(['username' => $username], ['password' => $password]);

        $this->info("Password for admin user \"{$admin->username}\" was reset to the value of ADMIN_PASSWORD.");

        return self::SUCCESS;
    }
}
