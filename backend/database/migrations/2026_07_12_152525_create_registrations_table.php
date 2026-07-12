<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('family_name');
            $table->string('husband_name');
            $table->string('husband_phone');
            $table->string('wife_name');
            $table->string('wife_phone');
            $table->unsignedInteger('children_count');
            $table->string('children_birth_years');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
