import { Module } from "@nestjs/common";
import { UsersModuleDb } from "../dbModules/users/users.module";
import { SignUpService } from "./service/signup.service";
import { SignUpController } from "./signup.controller";

@Module({
    imports: [UsersModuleDb],
    controllers: [SignUpController],
    providers: [SignUpService]
})
export class SignUpModule {};