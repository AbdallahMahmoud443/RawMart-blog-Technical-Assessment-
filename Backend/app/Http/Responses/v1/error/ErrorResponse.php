<?php

namespace App\Http\Responses\v1\error;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class ErrorResponse implements Responsable
{

    public function __construct(
        protected string $title,
        protected string $detail,
        protected string $instance,
        protected string $code,
        protected string $link,
        protected int $status
    ) {}
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request): JsonResponse
    {
        return new JsonResponse(data: [
            'title' => $this->title,
            'detail' => $this->detail,
            'instance' => $this->instance,
            'code' => $this->code,
            'links' => $this->link
        ], status: $this->status);
    }
}
