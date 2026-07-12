<?php

namespace App\Console\Commands;

use App\Models\Admin;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('admin:ensure')]
#[Description('Create the admin user from ADMIN_USERNAME/ADMIN_PASSWORD if none exists yet. Safe to run on every deploy - never overwrites an existing admin.')]
class EnsureAdminCommand extends Command
{
    public function handle(): int
    {
        if (Admin::count() > 0) {
            $this->info('An admin user already exists - nothing to do.');

            return self::SUCCESS;
        }

        $username = config('app.admin_username', 'admin');
        $password = config('app.admin_password', 'nofei-nechemia-2026');

        Admin::create(['username' => $username, 'password' => $password]);

        $this->info("Created admin user \"{$username}\" from ADMIN_USERNAME/ADMIN_PASSWORD.");

        return self::SUCCESS;
    }
}
