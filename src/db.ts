import { DataSource } from "typeorm";
import { Coin } from "./entities/Coin";
import { Prices } from "./entities/Prices";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT!),
    database: process.env.DATABASE_NAME,
    entities: [Coin, Prices, User],
    logging: false,
    synchronize: true
});
