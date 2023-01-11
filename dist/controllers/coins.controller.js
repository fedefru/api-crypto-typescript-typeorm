"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.lastPriceCoin = exports.updateCoin = exports.getCoins = exports.createCoin = void 0;
const Coin_1 = require("../entities/Coin");
const Prices_1 = require("../entities/Prices");
// Un endpoint que permita insertar un registro en la base de datos con la cotización actual de una criptomoneda/token
const createCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, symbol, currentPrice } = req.body;
        const coin = new Coin_1.Coin();
        const price = new Prices_1.Prices();
        coin.name = name;
        coin.symbol = symbol;
        yield coin.save();
        price.coin = coin;
        price.currentPrice = currentPrice;
        yield price.save();
        return res.json(coin);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createCoin = createCoin;
// Un endpoint público que permita listar los tokens soportados, su nombre y alguna otra información considerada relevante
const getCoins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coins = yield Coin_1.Coin.find({ relations: { currentPrice: true } });
        return res.json(coins);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCoins = getCoins;
// Un endpoint que permita modificar un registro existente
const updateCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, symbol, currentPrice } = req.body;
        const price = new Prices_1.Prices();
        const coin = yield Coin_1.Coin.findOneBy({ id: parseInt(req.params.id) });
        if (!coin)
            return res.status(404).json({ message: "No se encontro ninguna Coin." });
        yield Coin_1.Coin.update({ id: parseInt(id) }, {
            name: name,
            symbol: symbol,
        });
        price.coin = coin;
        price.currentPrice = currentPrice;
        price.save();
        return res.status(204).json("Se actualizo con exito.");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateCoin = updateCoin;
// Un endpoint público que permita consultar el último precio de un token
const lastPriceCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const price = yield Prices_1.Prices.createQueryBuilder("prices")
            .innerJoinAndSelect("prices.coin", "coin")
            .where("coin.id = :id", { id: id })
            .orderBy("prices.updatedAt", "DESC")
            .getOne();
        res.status(200).json({ price });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.lastPriceCoin = lastPriceCoin;
// Un endpoint público que permita consultar la historia completa de precios de un token
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const coin = yield Coin_1.Coin.createQueryBuilder("coin")
            .innerJoinAndSelect("coin.currentPrice", "prices")
            .where("prices.coin = :id", { id: id })
            .orderBy("prices.updatedAt", "DESC")
            .getMany();
        res.status(200).json({ coin });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getHistory = getHistory;
