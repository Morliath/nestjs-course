import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ValidationException } from "./validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {

        const context = host.switchToHttp();
        const response = context.getResponse();
        const statusCode = 400;

        return response.status(statusCode).json({
            statusCode,
            createdBy: "ValidationFilter",
            validationErrors: exception.validationErrors,
        });
    }
}