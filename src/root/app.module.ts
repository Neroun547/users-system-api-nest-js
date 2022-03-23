import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";  
import { RouterModule } from "@nestjs/core";
import { InfoModule } from "src/info/info.module";
import { SignUpModule } from "src/signup/signup.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { db, passwordDb, usernameDb, hostDb, portDb } from "../../config.json";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [AuthModule, InfoModule, SignUpModule, UsersModule, RouterModule.register([
            {
                path: "/signin",
                module: AuthModule
            },
            {
                path: "/signup",
                module: SignUpModule
            },
            {
                path: "/users",
                module: UsersModule
            },
            {
                path: "/",
                module: InfoModule
            }
        ]),
        TypeOrmModule.forRoot({
            type: "mysql",
            database: db,
            password: passwordDb,
            username: usernameDb,
            host: hostDb,
            port: portDb,
            synchronize: true,
            autoLoadEntities: true
        })
    ]
})
export class AppModule {};