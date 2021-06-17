import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const statusCode = exception.getStatus();

        return response.status(statusCode).json({
            statusCode,
            createdBy: "HttpExceptionFilter",
            errorMessage: exception.message.message,
        });
    }
}