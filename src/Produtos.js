import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo';

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoriaId: ''
        }
    }

    componentDidMount() {
        this.props.loadCategoria()
    }
    handleCategoria = (key) => {

        if (key.keyCode === 13) {
            const valor = this.refs.categoria.value
            alert(valor)
            this.props.handleCategoria(valor)
            this.refs.categoria.value = ''
        }
    }

    handleEditCategoria = (key) => {

        if (key.keyCode === 13) {
            const valor = this.refs.cat_.value
            this.props.handleEditCategoria({
                id: this.state.categoriaId,
                categorias: valor
            })
            this.refs.cat_.value = ''
            console.log(valor)
        }
    }
    editCategoria = (cat) => {
        this.setState({
            categoriaId: cat.id
        })

    }

    cancelar = () => {
        console.log("pass")
        this.setState({
            categoriaId: ''
        })
    }

    renderCategorias = (cat) => {

        return (
            <li key={cat.id}>
                {this.state.categoriaId === cat.id &&
                    <div className="input-group">
                        <div className="input-group-btn">
                            <input className="form-control" type='text' defaultValue={cat.categorias}
                                ref={'cat_'}
                                onKeyUp={this.handleEditCategoria} />
                            <button type="button" className="btn" onClick={() => this.cancelar()}>cancel</button>

                        </div>

                    </div>}
                {
                    this.state.categoriaId !== cat.id &&
                    <div>
                        <button type="button" className="btn btn-sm" onClick={() => this.props.removeCategoria(cat)}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                        <button type="button" className="btn btn-sm" onClick={() => this.editCategoria(cat)}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <Link to={`/produtos/categoria/${cat.id}`}>
                            {cat.categorias}</Link>
                    </div>
                }
            </li>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div className="row">
                <div className="col-md-2">
                    <h3>Categorias </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>{this.props.categorias.map(this.renderCategorias)}</ul>
                    <div className="well col-sm">
                        <input type="text"
                            ref="categoria"
                            className="form-control"
                            placeholder="Nova catgoria"
                            onKeyUp={this.handleCategoria}
                        />
                    </div>
                    <Link to={'/produtos/novo'}>Novo Produto</Link>
                </div>
                <div className="col-md-10">
                    <h1>Produtos</h1>
                    <Route exact path={this.props.match.url + '/categoria/:catId'} 
                    
                    render={(props)=> {
                        return(<Categoria
                            {...props}
                          loadProduto={this.props.loadProduto}
                          produtos={this.props.produtos}
                          loadCategoriaId={this.props.loadCategoriaId}
                          categorias={this.props.categorias}
                            />
                        )
                    }}>
                    </Route>
                    <Route exact path={this.props.match.url + '/novo'} render={(props) => {
                        return (
                             <ProdutosNovo {...props} categoria={this.props.categorias}
                              createProduto={this.props.createProduto}
                             
                             />
                            
                            )
                    } }/>
                </div>
            </div>
        )
    }
}
export default Produtos