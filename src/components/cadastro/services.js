import connect from '../../services';

export const _saveCadastro = (json) => {
    const response = connect.post('/categorias', json);
    return response;
}

export const _getCategoria = () => {
    const response = connect.get('/categorias');
    return response;
}