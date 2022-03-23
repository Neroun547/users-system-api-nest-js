import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { UsersServiceDb } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    providers: [UsersServiceDb],
    exports: [UsersServiceDb]
})
export class UsersModuleDb {};
