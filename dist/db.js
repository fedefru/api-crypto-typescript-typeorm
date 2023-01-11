"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Coin_1 = require("./entities/Coin");
const Prices_1 = require("./entities/Prices");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT),
    database: 'coins',
    entities: [Coin_1.Coin, Prices_1.Prices, User_1.User],
    logging: false,
    synchronize: true
});
