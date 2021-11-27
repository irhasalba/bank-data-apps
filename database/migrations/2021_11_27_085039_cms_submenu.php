<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CmsSubmenu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_submenu', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_parent_menu');
            $table->foreign('id_parent_menu')->references('id')->on('cms_menu');
            $table->string('nama_submenu')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cms_submenu');
    }
}
