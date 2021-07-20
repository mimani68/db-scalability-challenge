import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transactions {

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

}