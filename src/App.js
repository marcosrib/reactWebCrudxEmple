import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      categorias: []
    })
  }
  loadCategoria = () => {
    this.props.Api.loadCategrias()
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  removeCategoria = (cat) => {

    this.props.Api.deleteCategoria(cat.id)
      .then(res => {
        this.loadCategoria()
      })
  }

  handleCategoria = (valor) => {
    console.log(valor)
    this.props.Api.saveCategoria({
      categorias: valor
    }).then(res => {
        this.loadCategoria()
      })

  }
  handleEditCategoria = (valor) => {
    console.log(valor)
    this.props.Api.editCategoria(valor)
    .then(res => {
        this.loadCategoria()
      })

  }
createProduto =(produto) => {
  return this.props.Api.createProduto(produto)
}

  render() {

    return (
      <Router>

        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <a href='/' className="navbar-brand">
                  Gerenciador de produtos
            </a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (
                <Produtos {...props}
                  loadCategoria={this.loadCategoria}
                  categorias={this.state.categorias}
                  removeCategoria={this.removeCategoria}
                  handleCategoria={this.handleCategoria}
                  handleEditCategoria={this.handleEditCategoria}
                  createProduto={this.createProduto}
                />)
            }
            }


            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
