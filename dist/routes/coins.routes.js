"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coins_controller_1 = require("../controllers/coins.controller");
const validateToken_1 = require("../services/validateToken");
const router = express_1.default.Router();
router.get('/coin', coins_controller_1.getCoins);
router.post('/coin', validateToken_1.validationToken, coins_controller_1.createCoin);
router.put('/coin/:id', validateToken_1.validationToken, coins_controller_1.updateCoin);
router.get('/coin/currentPrice/:id', coins_controller_1.lastPriceCoin);
router.get('/coin/history/:id', coins_controller_1.getHistory);
exports.default = router;
