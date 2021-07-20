import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from "./tx";

@Entity()
export class Merchant {
    
    @PrimaryGeneratedColumn()
    id!: number | string;

    @Column()
    display_name!: string;

    @Column()
    icon_url!: string;

    @Column()
    funny_gif_url!: string;

    @OneToMany(() => Transaction, el => el.merchant)
    transactions!: Transaction[];
}