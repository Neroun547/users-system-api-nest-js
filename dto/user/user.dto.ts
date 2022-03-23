import { IsString, Length } from "class-validator";

export class UserDto {
    @IsString()
    @Length(3, 20)
    username: string;

    @IsString()
    @Length(3, 20)
    password: string;
}
