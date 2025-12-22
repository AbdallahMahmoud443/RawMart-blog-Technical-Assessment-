<?php

namespace App\Exceptions;

use App\Http\Responses\v1\error\ErrorResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;
use Throwable;

class ErrorFactory
{
    public static function create(Throwable $e, Request $request): ErrorResponse
    {
        if ($e instanceof NotFoundHttpException) {
            return new ErrorResponse(
                title: "Resource not found",
                detail: $e->getMessage(),
                instance: $request->path(),
                code: "RESOURCE_NOT_FOUND",
                link: "http://hyatt-api.test/api/v1/errors/404",
                status: Response::HTTP_NOT_FOUND
            );
        } elseif ($e instanceof ValidationException) {
            return  new ErrorResponse(
                title: "Validation failed",
                detail: json_encode($e->errors()),
                instance: $request->path(),
                code: "VALIDATION_FAILED",
                link: "http://hyatt-api.test/api/v1/errors/422",
                status: Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        } elseif ($e instanceof AuthenticationException) {
            return  new ErrorResponse(
                title: "Authentication failed",
                detail: "Your authentication credentials are invalid or have expired.",
                instance: $request->path(),
                code: "AUTHENTICATION_FAILED",
                link: "http://hyatt-api.test/api/v1/errors/401",
                status: Response::HTTP_UNAUTHORIZED,
            );
        }
        return new ErrorResponse(
            title: "Internal Server Error",
            detail: $e->getMessage(),
            instance: $request->path(),
            code: "INTERNAL_SERVER_ERROR",
            link: "http://hyatt-api.test/api/v1/errors/500",
            status: Response::HTTP_INTERNAL_SERVER_ERROR,
        );
    }
}
