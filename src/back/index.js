// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const path = require('path');
import path from 'path';
// const Item = require('../model/item');
import Item from '../model/item';

// Configuración de express:
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// Así podemos usar req.body
app.use(express.static('public')); // Ver si acá no tengo que agregar (dirname+"public")
app.use(express.static('views'));

// Connect to MongoDB
const dbURI = 'mongodb+srv://admin:admin@tareanode.wvu7v.mongodb.net/node-AYI?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Express corriendo en http://localhost:${port}`);
    });
  }).catch((err) => console.log('Hubo un error!', err));

// RUTEO para tarea:

// Home "/" GET
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Items "/items" GET
app.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/items.html'));
});

// GET y POST para api/items
app.route('/api/items/')
  .get((req, res) => {
    if (req.query.min && req.query.min) { // Query para precio máximo y mínimo
      Item.find(
        { price: { $gte: req.query.min, $lte: req.query.max } },
      )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.log('HUBO ERROR', error);
        });
    } else if (req.query.title) { // Query para título
      Item.find(
        { title: req.query.title },
      )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.log('HUBO ERROR', error);
        });
    } else { // Query para traer todos
      Item.find()
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.log('HUBO ERROR', error);
        });
    }
  })
  .post((req, res) => {
    console.log('Se agregó un artículo así: ', req.body);
    const item = new Item(req.body); // así sería creo

    item.save()
      .then(() => {
        res.redirect('/items'); // cosa que si envía algo lo vuelva a llevar a la lista de items y vea el item nuevo
      })
      .catch((error) => {
        console.log(error);
      });
  });

// Ruteo para api/items/id
app.route('/api/items/:id') // así como está anda
  .get((req, res) => { // Para traer un único producto por ID
    Item.findById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('HUBO ERROR', error);
      });
  })
  .put((req, res) => {
    Item.findOneAndUpdate( // Ver si puedo desestructurar objetos acá?
      { id: req.params.id },
      {
        $set: { // para que sea por JSON sería tomando el body?
          title: req.body.title,
          price: req.body.price,
          stock: req.body.stock,
          description: req.body.description,
        },
      },
    )
      .then(() => { console.log('Encontró y actualizó elemento con #ID', req.params.id); })
      .catch((error) => console.error(error));
    res.send('PUT request to /api/items');
  })
  .delete((req, res) => {
    Item.deleteOne(
      { id: req.params.id },
    )
      .then(() => { console.log('Se eliminó el elemento con #ID', req.params.id); })
      .catch((error) => console.error(error));

    res.send('DELETE request to /api/items');
  });

// Probando mandar algo a la DB
app.get('/add-item', (req, res) => {
  const item = new Item({
    titulo: 'camisa2',
    precio: 500,
  });

  item.save()
    .then((result) => {
      res.send(result);
      console.log('Item enviado a la DB');
    })
    .catch((error) => {
      console.log('HUBO ERROR', error);
    });
});

// Para ver todos los items
app.get('/all-items', (req, res) => {
  Item.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('HUBO ERROR', error);
    });
});

// Para ver un solo item
app.get('/single-item', (req, res) => {
  Item.findById('615c7704a91c19c0a0e804b1') // el ID del producto que nosotros querramos
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('HUBO ERROR', error);
    });
});

// Esto es para lo de que devuelva JSON y eso:

/*

app.get("/custom_response", (req, res) => {
  const type = req.query.param;

  let data = { nombre: "Juan", apellido: "Perez" };

  switch (type) {
    case "json":
      data = JSON.stringify(data);
      res.send(data);
      break;
    case "html":
      data = "<h1>" + data.nombre + " " + data.apellido + "</h1>";
      res.send(data);
      break;
    case "text":
      console.log("Text Switch");
      data = data.nombre + " " + data.apellido;
      res.send(data);
      break;
    default:
      console.log(`No pude hacer nada con ${type}`);
      res.send(data);
      break;
  }
});

*/

