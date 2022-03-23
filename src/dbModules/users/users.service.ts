import { Injectable } from "@nestjs/common";
import { IUser } from "../../../interfaces/user.interface";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersServiceDb {
    constructor(private readonly repository: UsersRepository){};

    async createUser(user: IUser) {
        await this.repository.save(user);
    }

    async findUserByUserName(username: string) {
        return await this.repository.findOne({ username });
    }

    async findUserById(_id: number) {
        return await this.repository.findOne({ _id });
    }

    async getCountUsers() {
        return await this.repository.count();
    }

    async getUsers(take: number, skip: number) {
        return await this.repository
        .createQueryBuilder()
        .skip(skip)
        .take(take)
        .getMany();
    }

    async deleteUser(_id: number) {
        await this.repository.delete({ _id });
    }

    async editUserById(_id: number, username: string, password: string) {
        await this.repository.update({ _id }, { username, password });
    }
}
