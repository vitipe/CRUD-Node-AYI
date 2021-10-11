import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Item from './model/Item';

// Configuración de express:
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// Así podemos usar req.body
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('views'));

// Conectar MongoDB
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
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Items "/items" GET
app.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET y POST para api/items
app.route('/api/items/')
  .get((req, res) => {
    if (req.query.min && req.query.max) {
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
    const item = new Item(req.body); // así sería creo
    console.log('Se agregó un elemento a la db: ', req.body);

    item.save()
      .then(() => {
        res.redirect('/items');
      })
      .catch((error) => {
        console.log('HUBO ERROR', error);
      });
    res.send('POST request to /api/items');
  });

// Ruteo para api/items/id
app.route('/api/items/:id')
  .get((req, res) => {
    Item.findById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log('HUBO ERROR', error);
      });
  })
  .put((req, res) => {
    Item.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
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
    console.log(req.params.id)
    Item.deleteOne(
      { _id: req.params.id },
    )
      .then(() => { console.log('Se eliminó el elemento con #ID', req.params.id); })
      .catch((error) => console.error(error));
    res.send('request pa DELETE');
  });

// // 404 por si no hay página
// app.get('*', function(req, res){
//   res.status(404).send('<h1>Error 404 - No existe esa página</h1>');
// });
