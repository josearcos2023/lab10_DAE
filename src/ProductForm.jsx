import React, { Component } from 'react';


class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
      precio: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      id: this.state.id,
      descripcion: this.state.descripcion,
      precio: this.state.precio,
    };

    fetch('http://localhost:8000/api/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al agregar el producto');
        }
      })
      .then((productoAgregado) => {
        this.props.insertarProducto(productoAgregado);
        this.setState({
          descripcion: '',
          precio: '',
        });
      })
      .catch((error) => {
        console.error('Error en la solicitud POST:', error);
      });

  };

  render() {
    return (
      <div>
        <form class="form-group" onSubmit={this.handleSubmit}>
          <div>
          <label for="descripcion" class="form-label">
            Descripción:
            <input
              class="form-control"
              type="text"
              id="descripcion"
              name="descripcion"
              value={this.state.descripcion}
              onChange={this.handleChange}
            />
          </label>
          </div>
          <div>
          <label for="precio" class="form-label">
            Precio:
            <input
              class="form-control"
              type="number"
              id="precio"
              name="precio"
              value={this.state.precio}
              onChange={this.handleChange}
            />
          </label>
          </div>
          <button class="btn btn-sm btn-warning" type="submit">Guardar</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;