import React, { Component } from 'react'
import Axios from 'axios';

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            categorias: []
        }
    }
    loadData=(id)=> {
        Axios.get('http://localhost:3001/produtos?categoria='+id)
        .then(res => {
            this.setState({ produtos: res.data })
        })
        Axios.get('http://localhost:3001/categorias/'+id)
        .then(res => {
            this.setState({ categorias: res.data })
        })
    }
    componentDidMount() {
        const id = this.props.match.params.catId;
        this.loadData(id)
    }
    componentWillReceiveProps(newProps){
        this.loadData(newProps.match.params.catId)
    }
    renderProduto(produto){
        return(
            <p className="well">{produto.produto}</p>
        )
    }
    render() {
         
        return (
            <div>
            
                <h1>{this.state.categorias.categorias}</h1>
                {this.state.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria