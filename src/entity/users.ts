import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from "./tx";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: string | number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @OneToMany(() => Transaction, el => el.user)
    transactions!: Transaction[];

}