import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Prices } from './Prices';

@Entity()
export class Coin extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Prices, (prices) => prices.coin)
    currentPrice: Prices[];

}