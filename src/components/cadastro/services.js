import connect from '../../services';

export const _saveCadastro = (json) => {
    const response = connect.post('/cadastro/save-data', json);
    return response;
}

export const _getCategoria = () => {
    const response = connect.get('/cadastro/get-data');
    return response;
}