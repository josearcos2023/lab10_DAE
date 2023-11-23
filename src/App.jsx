
import React, { Component } from 'react';
import ProductForm from './ProductForm.jsx';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: true,
      showProductForm: false,
    };
  }

  nuevoProducto = () => {
    this.setState({ showProductForm: true });
  };

  //Delete//
  eliminarProducto(id) {
    fetch(`http://localhost:8000/api/producto/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          //Actualiza la tabla//
          const refreshProducts = this.state.productos.filter(
            (prod) => prod.id !== id
          );
          this.setState({ productos: refreshProducts });
        } else {
          console.error('Error al eliminar el producto');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/producto')
      .then((response) => {
        return response.json();
      })
      .then((prod) => {
        this.setState({ 
          productos: prod,
          recuperado: true
        })
      })    
  }

  mostrarTabla() {
    return (
      <div>
        <div>
          <button class="btn btn-sm btn-warning start-0" onClick={() => this.nuevoProducto()}>
                      Nuevo Producto
          </button>
        </div>
        <div>
        <table class="table table-striped" border="1">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th colSpan={2} >Acciones</th>                    
          </tr>
        </thead>
        <tbody>  
          {this.state.productos.map(prod => {
            return (
              <tr key={ prod.id }>
                <td>{ prod.id }</td>
                <td>{ prod.descripcion }</td>
                <td>{ prod.precio }</td>
                <td>
                  <button class="btn btn-sm btn-success" onClick={() => this.editarProducto(prod.id)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" onClick={() => this.eliminarProducto(prod.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>

        </div>
        
      </div>
    );
  }

  render() {
    if (this.state.recuperado) {
      return (
        <div>
          {this.state.showProductForm ? (
            <ProductForm />
          ) : (
            this.mostrarTabla()
          )}
        </div>
      );
    } else {
      return <div>Recuperando datos...</div>;
    }
  }
}

export default App;