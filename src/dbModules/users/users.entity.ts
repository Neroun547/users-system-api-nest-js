import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({ unique: true })
    username: string

    @Column()
    password: string
}
