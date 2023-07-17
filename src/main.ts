import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from './common/filters/HttpException.filter';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/rest-response.interceptor';
import RateLimit from 'express-rate-limit';

async function bootstrap() {
  const logger = new Logger('KSI');
  logger.log(`Application [KSI] is starting...`);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.use(
    RateLimit({
      windowMs: 5 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      handler: (request, response) => {
        return response.status(501).send({
          error: {
            message: 'Too many requests. Please keep calm and get slow down.',
            details: `More then 100 requests in last minute from your IP`,
          },
        });
      },
    }),
  );
}
bootstrap().catch((e) => {
  throw new Error(e);
});
