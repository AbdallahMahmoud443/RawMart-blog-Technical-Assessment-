<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'PHP',
            'Laravel',
            'JavaScript',
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'Kubernetes',
            'AWS',
            'Azure',
            'GCP',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Redis',
            'Git',
            'Docker',
        ];

        foreach ($tags as $tag) {
            \App\Models\Tag::create(['name' => $tag]);
        }
    }
}
