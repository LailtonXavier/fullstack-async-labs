import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/server/app.module';
import { DomainExceptionFilter } from './shared/filters/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fullstack-async-labs.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  }); 

  const port = process.env.PORT ?? 3000;
  app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(port);
}
bootstrap();
