<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ImageUploadService
{
    /**
     * Store an uploaded image in a given folder and return the relative path
     *
     * @param UploadedFile|null $file
     * @param string $folder
     * @return string|null
     */
    public static function storeImage(UploadedFile $file, string $folder = 'images'): string
    {
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
        $path = public_path($folder);
        
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }

        $file->move($path, $filename);

        return $folder . '/' . $filename; 
    }
}