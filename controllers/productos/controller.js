import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllProductos = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Producto').find({}).limit(50).toArray(callback);
};

const crearProducto = async (datosProducto, callback) => {
  if (
    Object.keys(datosProducto).includes('name') &&
    Object.keys(datosProducto).includes('brand') &&
    Object.keys(datosProducto).includes('model')
  ) {
    const baseDeDatos = getDB();
    // crear producto en la BD
    await baseDeDatos.collection('Producto').insertOne(datosProducto, callback);
  } else {
    return 'error';
  }
};

const consultarProducto = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Producto').findOne({ _id: new ObjectId(id) }, callback);
};

const editarProducto = async (id, edicion, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Producto')
    .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarProducto = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Producto').deleteOne(filtroProducto, callback);
};

export { queryAllProductos, crearProducto, consultarProducto, editarProducto, eliminarProducto };
