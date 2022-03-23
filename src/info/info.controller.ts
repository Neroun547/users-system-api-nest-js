import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

@Controller()
export class InfoController {
    @Get()
    infoPage(@Req() req: Request, @Res() res: Response) {
        if(!req.cookies["token"]) {
            res.render("info", {
                noEntry: true
            });
        } else {
            res.render("info");
        }
    }
}