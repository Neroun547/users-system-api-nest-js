import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersServiceDb } from "src/dbModules/users/users.service";  
import { IUser } from "../../../interfaces/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class SignUpService {

    constructor(private readonly authServiceDb: UsersServiceDb){};

    async createUser(user: IUser) {
        if(await this.authServiceDb.findUserByUserName(user.username)) {
            throw new BadRequestException({ message: "User them same username already exists ..." });
        }

        const hash = await bcrypt.hash(user.password, 10);
        const saveUser = { ...user, password: hash };

        await this.authServiceDb.createUser(saveUser);
    }
}
