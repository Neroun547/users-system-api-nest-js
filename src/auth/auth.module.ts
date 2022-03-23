import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { secretJwt } from "../../config.json";
import { PassportModule } from "@nestjs/passport";
import { UsersModuleDb } from "../dbModules/users/users.module";

@Module({
    imports: [UsersModuleDb, PassportModule, JwtModule.register({
        signOptions: { expiresIn: "6h" },
        secret: secretJwt
    })],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {};
