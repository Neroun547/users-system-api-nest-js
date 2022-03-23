import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./root/app.module";
import { engine } from "express-handlebars";
import { resolve } from "path";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "../error-filter/errorFilter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve("static"));
  
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  app.engine("hbs", engine({
    extname:"hbs"
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  app.set("view engine", "hbs");
  app.set("views", "./views");

  await app.listen(3000);
}

bootstrap();
