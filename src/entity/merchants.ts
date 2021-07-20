import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}