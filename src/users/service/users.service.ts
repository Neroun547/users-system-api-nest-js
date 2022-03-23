import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersServiceDb } from "../../dbModules/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private readonly usersServiceDb: UsersServiceDb){};
    
    async getUsers(take: number, skip: number) {
        return await this.usersServiceDb.getUsers(take, skip);
    }

    async deleteUser(id: number) {
        await this.usersServiceDb.deleteUser(id);
    }

    async editUser(id: number, username: string, password: string) {
        const findUserInDbByUserName = await this.usersServiceDb.findUserByUserName(username);

        if(findUserInDbByUserName && findUserInDbByUserName._id !== id) {
            throw new BadRequestException({ message: "User the same username already exists" });
        }
        const hash = await bcrypt.hash(password, 10);
        await this.usersServiceDb.editUserById(id, username, hash);
    }

    async getCountUsers() {
        return await this.usersServiceDb.getCountUsers();
    }
}
