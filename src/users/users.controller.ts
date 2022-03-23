import { Body, Controller, Delete, Get, Param, ParseIntPipe, Req, Res, UseGuards, Put, Query } from "@nestjs/common";
import { UserDto } from "dto/user/user.dto";
import { Request, Response } from "express";  
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UsersService } from "./service/users.service";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @Get()
    @UseGuards(AuthGuard)
    async usersPage(@Res() res: Response) {
        const users = await this.usersService.getUsers(5, 0);
        const countUsers = await this.usersService.getCountUsers();

        res.render("users", {
            countUsers: users.length,
            users: users,
            loadMore: countUsers > 5 ? true : false, 
            style: "/css/users.css",
            script: "/js/users.js"
        });
    }

    @Get("load-more/:skip")
    @UseGuards(AuthGuard)
    async getMoreUsers(@Param("skip", new ParseIntPipe()) skip: number, @Res() res: Response) {
        const users = await this.usersService.getUsers(5, skip);

        res.send({ message: users });
    }

    @Put("edit-user/:id")
    @UseGuards(AuthGuard)
    async editUser(@Param("id", new ParseIntPipe()) id: number, @Body() newUserParams: UserDto, @Res() res: Response) {
        await this.usersService.editUser(id, newUserParams.username, newUserParams.password);

        res.send({message: "User params was updated success"});
    }

    @Delete("delete-user/:id")
    @UseGuards(AuthGuard)
    async deleteUser(@Param("id", new ParseIntPipe()) id: number, @Res() res: Response) {
        await this.usersService.deleteUser(id); 

        res.send({ message: "User was deleted success" });
    }

    @Get("edit-user-form/:id")
    @UseGuards(AuthGuard)
    async editUserFormPage(@Req() req: Request, @Res() res: Response) {
        res.render("editUserForm", {
            style: "/css/signinForm.css",
            script: "/js/editUser.js"
        });
    }
}
