import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Coin } from './Coin';

@Entity()
export class Prices extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => Coin, (coin) => coin.currentPrice)
    coin: Coin;

    @Column({type: 'double'})
    currentPrice: number;

}