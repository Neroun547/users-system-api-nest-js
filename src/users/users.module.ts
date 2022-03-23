import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./service/users.service";
import { UsersModuleDb } from "src/dbModules/users/users.module";

@Module({
    imports: [UsersModuleDb],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {};