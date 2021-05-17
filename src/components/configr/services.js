import connect from '../../services';

export const _get = async (categoria) => {
    const response = await connect.post('cadastro/filter-data/' + categoria);
    return response;
}

export const _delete = async (id) => {
    const response = await connect.delete('cadastro/delete-data/' + id);
    return response;
}

export const _update = async (data) => {
    const response = await connect.put('cadastro/update-data/', data);
    return response;
}