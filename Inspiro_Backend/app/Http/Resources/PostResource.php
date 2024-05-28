<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'media' => $this->media,
            'category' => $this->category,
            'comments_count' => $this->comments()->count(),
            'creator' => new UserResource($this->creator),
            'created_on' => $this->created_at,
        ];
    }
}
