import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
class ProdutosNovo extends Component {
    state= {
        redirect: false
    }
    handleNewProduto=()=>{
        const produto = {
            produto: this.refs.produto.value,
            categoria:this.refs.categoria.value
        }
        console.log(produto)
        this.props.createProduto(produto)
        .then((res)=> this.setState({ redirect: '/produtos/categoria/'+produto.categoria}))
       
    }
    render() {
        console.log("==============")
        console.log(this.state.redirect)
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        const { categoria } = this.props
        return (
            <div>
                <h2>Novo Produto  </h2>
                <select ref='categoria'>
                {categoria.map((c)=> <option key={c.id} value={c.id} >{c.categorias}</option>)}
                </select>
               
                <input placeholder='nome do novo produto'
                    className='form-control'
                    ref='produto'
                >
                </input>
                <button onClick={this.handleNewProduto} >Salvar</button>
            </div>
        )
    }
}
export default ProdutosNovo