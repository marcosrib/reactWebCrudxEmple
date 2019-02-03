import React, { Component } from 'react'
import Axios from 'axios';

class Categoria extends Component {
   
    loadData=(id)=> {
       this.props.loadProduto(id)
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
            
                <h1>{this.props.categorias.categorias}</h1>
                {this.props.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria