import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ValidationError } from "class-validator";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filters/fallback.filer";
import { HttpExceptionFilter } from "./filters/http.filter";
import { ValidationException } from "./filters/validation.exception";
import { ValidationFilter } from "./filters/validation.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/v1');
    app.useGlobalFilters(
        new FallbackExceptionFilter(),
        new HttpExceptionFilter(),
        new ValidationFilter(),
    );

    app.useGlobalPipes(new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map(
                error => `${error.property} has wrong value ${error.value} ${Object.values(error.constraints).join(', ')}`
            )

            return new ValidationException(messages);
        }
    }));
    await app.listen(9000);
}

bootstrap();