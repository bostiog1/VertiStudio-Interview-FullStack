// src/utils/errorHandler.ts
import { Response } from "express";

type ErrorResponse = {
  code: number;
  message: string;
  details?: unknown;
};

export const handleHttpError = (error: unknown): ErrorResponse => {
  console.error("Server Error:", error);

  // Handle JWT errors
  if (error instanceof jwt.JsonWebTokenError) {
    return { code: 401, message: "Invalid token" };
  }

  // Handle database errors
  if (error instanceof Error && error.message.includes("SQLITE_CONSTRAINT")) {
    return { code: 409, message: "Database conflict occurred" };
  }

  // Generic error fallback
  return {
    code: 500,
    message: "Internal server error",
    details: process.env.NODE_ENV === "development" ? error : undefined,
  };
};

export const sendErrorResponse = (error: ErrorResponse, res: Response) => {
  return res.status(error.code).json(error);
};
