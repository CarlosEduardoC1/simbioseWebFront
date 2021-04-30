import connect from '../../services';

export const _get = async (categoria) => {
    const response = await connect.post('cadastro/filter-data/' + categoria);
    return response;
}

export const _delete = async (id) => {
    console.log(id);
    const response = await connect.delete('cadastro/delete-data/' + id);
    return response;
}