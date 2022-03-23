import { Controller, Get, Post, Req, Res, Body } from "@nestjs/common";
import { Request, Response } from "express";
import { UserDto } from "../../dto/user/user.dto";
import { AuthService } from "./service/auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {};
    @Get()
    signInPage(@Req() req: Request, @Res() res: Response) {
        res.render("signin", {
            style: "/css/signinForm.css",
            script: "/js/signIn.js",
            noEntry: true
        });
    }

    @Post()
    async login(@Body() body: UserDto, @Res() res: Response) {
        const token = await this.authService.login(body);   

        res.cookie("token", token);
        res.send({message: "Auth success"});
    }

    @Get("exit") 
    exitFromAccount(@Req() req: Request, @Res() res: Response) {
        res.cookie("token", "");
        res.redirect("/signin");
    }
}
