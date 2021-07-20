import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from "./tx";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: string | number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @OneToMany(() => Transaction, el => el.user)
    transactions!: Transaction[];

}