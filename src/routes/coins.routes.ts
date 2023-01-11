import express from "express";
import { createCoin, getCoins, getHistory, lastPriceCoin, updateCoin} from "../controllers/coins.controller";
import { validationToken } from "../services/validateToken";


const router = express.Router();

router.get('/coin', getCoins)

router.post('/coin', validationToken, createCoin)

router.put('/coin/:id', validationToken, updateCoin);

router.get('/coin/currentPrice/:id', lastPriceCoin);

router.get('/coin/history/:id', getHistory);

export default router;