import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Table, Form } from 'react-bootstrap';

// Utilizado para evitar el infinite loop del fetch de useEffect
let count = 0;

export default function() {

  const [items, setItems] = useState([]);
  const [titleItem, setTitleItem] = useState("")
  const [priceItem, setPriceItem] = useState("")
  const [stockItem, setStockItem] = useState("")
  const [descriptionItem, setDescriptionItem] = useState("")
  const [evitarRender, setEvitarRender] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

 
  useEffect(() => {
    fetch('http://localhost:3000/api/items')
    .then(res => res.json())
    .then(data => {
      setItems(data);
      setSearchResults(data);
    })
  }, [evitarRender])

  useEffect(() => {
    const results = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/items', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        title: titleItem,
        price: priceItem,
        stock: stockItem,
        description: descriptionItem,
      })
    })
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
    setEvitarRender(count += 1);
    setTitleItem('');
    setPriceItem('');
    setStockItem('');
    setDescriptionItem('');
  };

  const handleDelete = (idItem) => {
    fetch(`http://localhost:3000/api/items/${idItem}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
    setEvitarRender(count += 1);
  };

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitleItem(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPriceItem(e.target.value);
  };

  const handleChangeStock = (e) => {
    setStockItem(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescriptionItem(e.target.value);
  };

  return (
    <>
    <div>
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Filtrar producto por nombre"
        aria-label="Filtrar producto"
        aria-describedby="basic-addon2"
        value={searchTerm}
        onChange={handleChangeSearch}
      />
    </InputGroup>

    <Table striped bordered hover variant="dark">
      
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Descripcion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
        searchResults.map((item, i) => {
          return(
          <tr key={i}>
            <td>{i}</td>
            <td>{item._id}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>{item.description}</td>
            <td><Button onClick={() => handleDelete(item._id)}>Borrar</Button></td>
          </tr>)
        })
      }
      </tbody>
    </Table>
    </div>
  
  <Form onSubmit={handleSubmit}> 
    <h3>
      Ingresar un nuevo producto
    </h3>
    <Form.Group className="mb-3" controlId="formTitleItem">
      <Form.Label>Nombre del producto:</Form.Label>
      <Form.Control type="text" placeholder="" value={titleItem} onChange={handleChangeTitle}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formPriceItem">
      <Form.Label>Precio del producto:</Form.Label>
      <Form.Control type="number" placeholder="" value={priceItem} onChange={handleChangePrice}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formStockItem">
      <Form.Label>Stock del producto:</Form.Label>
      <Form.Control type="number" placeholder="" value={stockItem} onChange={handleChangeStock}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formDescriptionItem">
      <Form.Label>Descripción del producto</Form.Label>
      <Form.Control type="text" placeholder="" value={descriptionItem} onChange={handleChangeDescription}/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Enviar
    </Button>
  </Form>
  </>
  );
}
