import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Swagger configuration
 * @param app
 */
export function buildSwagger(app: INestApplication) {
  const bearerAuthType = process.env
    .SWAGGER_BEARER_AUTH_TYPE as SecuritySchemeType;

  if (process.env.SWAGGER_UI === 'false') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addBearerAuth({ in: 'header', type: bearerAuthType })
    .addServer(process.env.SWAGGER_SERVER)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //    SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);
}
