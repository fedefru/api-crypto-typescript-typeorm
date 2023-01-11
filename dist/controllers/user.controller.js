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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const encrypt_1 = require("../services/encrypt");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = new User_1.User();
        user.email = email;
        user.password = yield (0, encrypt_1.encryptPassword)(password);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.TOKEN_SECRET || "tokencaseundefined", {
            expiresIn: 60 * 4,
        });
        res.status(200).header("auth-token", token).json({
            message: "Usuario creado con exito",
            user: { id: user.id, email: user.email }
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOneBy({ email: email });
        if (!user)
            return res.status(400).json("Email o contraseña incorrectos");
        const checkPassword = yield (0, encrypt_1.validatePassword)(user.password, password);
        if (!checkPassword)
            return res.status(400).json("La contraseña es incorrecta.");
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.TOKEN_SECRET || "tokencaseundefined", {
            expiresIn: 60 * 4,
        });
        res.status(200).header("auth-token", token).json({ token: token });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signin = signin;
