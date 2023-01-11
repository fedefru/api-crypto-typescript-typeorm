import { Request, Response } from "express";
import { Coin } from "../entities/Coin";
import { Prices } from "../entities/Prices";

// Un endpoint que permita insertar un registro en la base de datos con la cotización actual de una criptomoneda/token
export const createCoin = async (req: Request, res: Response) => {
  try {
    const { name, symbol, currentPrice } = req.body;
    const coin = new Coin();
    const price = new Prices();

    coin.name = name;
    coin.symbol = symbol;
    await coin.save();

    price.coin = coin;
    price.currentPrice = currentPrice;

    await price.save();

    return res.json(coin);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Un endpoint público que permita listar los tokens soportados, su nombre y alguna otra información considerada relevante
export const getCoins = async (_req: Request, res: Response) => {
  try {
    const coins = await Coin.find({ relations: { currentPrice: true } });
    return res.json(coins);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Un endpoint que permita modificar un registro existente
export const updateCoin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, symbol, currentPrice } = req.body;

    const price = new Prices();
    const coin = await Coin.findOneBy({ id: parseInt(req.params.id) });

    if (!coin)
      return res.status(404).json({ message: "No se encontro ninguna Coin." });

    await Coin.update(
      { id: parseInt(id) },
      {
        name: name,
        symbol: symbol,
      }
    );

    price.coin = coin;
    price.currentPrice = currentPrice;
    price.save();

    return res.status(204).json("Se actualizo con exito.");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Un endpoint público que permita consultar el último precio de un token
export const lastPriceCoin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const price = await Prices.createQueryBuilder("prices")
      .innerJoinAndSelect("prices.coin", "coin")
      .where("coin.id = :id", { id: id })
      .orderBy("prices.updatedAt", "DESC")
      .getOne();

  res.status(200).json({ price });

  } catch (error) {
    if(error instanceof Error) {
      return res.status(500).json({message: error.message})
    }
  }
};

// Un endpoint público que permita consultar la historia completa de precios de un token
export const getHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const coin = await Coin.createQueryBuilder("coin")
      .innerJoinAndSelect("coin.currentPrice", "prices")
      .where("prices.coin = :id", { id: id })
      .orderBy("prices.updatedAt", "DESC")
      .getMany();
  
    res.status(200).json({ coin });

  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
