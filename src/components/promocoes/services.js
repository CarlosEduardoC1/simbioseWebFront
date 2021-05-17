import connect from '../../services';

export const _salvaImageBase64 = async (image) => {
    const response = await connect.post('/imagens/save-data', image);
    return response;
}

export const _getImageBase64 = async () => {
    const response = await connect.get('/imagens/get-data');
    return response;
}

export const _deleteImageBase64 = async (id) => {
    const response = await connect.delete('/imagens/delete-data/' + id);
    return response;
}