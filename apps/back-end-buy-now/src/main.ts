import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/server/app.module';
import { DomainExceptionFilter } from './shared/filters/domain-exception.filter';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  // const config = new DocumentBuilder()
  //   .setTitle('API Documentation')
  //   .setDescription('API Documentation')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup('api-docs', app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  //   customCss: '.swagger-ui .topbar { display: none }',
  //   customSiteTitle: 'API Documentation',
  // });

  const port = process.env.PORT ?? 3000;
  app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(port);
}
bootstrap();
