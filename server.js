// forma actual de importar en express 
// const express = require('express');
// nueva forma de importar en express (agregar type module en package.json)
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
dotenv.config({ path: './.env' });

const port = process.env.PORT || 5050
const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVentas);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);
