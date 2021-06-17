import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filters/fallback.filer";
import { HttpExceptionFilter } from "./filters/http.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/v1');
    app.useGlobalFilters(
        new FallbackExceptionFilter(),
        new HttpExceptionFilter()
    );

    await app.listen(9000);
}

bootstrap();