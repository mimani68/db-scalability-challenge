import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Merchant } from "./merchants";
import { User } from "./users";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: string;

    @Column()
    merchant_id!: string;

    @Column()
    description!: string;

    @Column()
    amount!: number;

    @Column()
    date!: string;

    @ManyToOne(() => User, el => el.transactions)
    user!: User;

    @ManyToOne(() => Merchant, el => el.transactions)
    merchant!: Merchant;

}