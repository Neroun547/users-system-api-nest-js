import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersServiceDb } from "src/dbModules/users/users.service";
import { IUser } from "interfaces/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly authServiceDb: UsersServiceDb) {};

    async login(user: IUser) {
        const userInDb = await this.authServiceDb.findUserByUserName(user.username);

        if(!userInDb) {
            throw new BadRequestException("Invalid username");
        }
        const result = await bcrypt.compare(user.password, userInDb.password);

        if(result) {
            return this.jwtService.sign(user);
        } 

        throw new BadRequestException("Invalid password");
    }
}
