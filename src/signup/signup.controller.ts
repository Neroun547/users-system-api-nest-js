import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserDto } from "../../dto/user/user.dto";
import { SignUpService } from "./service/signup.service";

@Controller()
export class SignUpController {
    constructor(private readonly signUpService: SignUpService){};

    @Get()
    signUpPage(@Req() req: Request, @Res() res: Response) {
        if(!req.cookies["token"]) {
            res.render("signup", {
                style: "/css/signinForm.css",
                script: "/js/signUp.js",
                noEntry: true
            });
        } else {
            res.render("signup", {
                style: "/css/signinForm.css",
                script: "/js/signUp.js"
            });
        }
    }

    @Post()
    async createUser(@Body() body: UserDto, @Res() res: Response) {
        await this.signUpService.createUser(body);

        res.send({message: "User was created success"});
    }
}
