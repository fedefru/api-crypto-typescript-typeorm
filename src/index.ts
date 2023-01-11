import dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "./db";
import app from "./app";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Conectado a la base de datos');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}

main();


