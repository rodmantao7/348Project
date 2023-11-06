import { NestFactory } from '@nestjs/core'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addBearerAuth()
    .build()
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('/api/apidoc', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
