import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3001/'
})
const apis = {
    loadCategoriaId: (id)=> api.get('categorias/'+id),
    loadCategrias: () => api.get('categorias'),
    deleteCategoria: (id) => api.delete('categorias/' + id),
    saveCategoria: (categoria) => api.post('categorias', categoria),
    editCategoria: (categoria) => api.put('categorias/' +categoria.id, categoria),

    loadCategoriaProdutoId: (id) => api.get('produtos?categoria='+id),
    createProduto: (produto) => api.post('produtos', produto)


}


export default apis;