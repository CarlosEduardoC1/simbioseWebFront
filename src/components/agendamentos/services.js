import connect from '../../services';

export const _getAgendamentos = async () => {
    const response = await connect.get('/agendamentos');
    return response;
}

export const _deletaAgendamento = async (id) => {
    const response = await connect.delete('/agendamentos/' + id);
    return response;
}

export const _filtroPorCategoria = async (categoria) => {
    const response = await connect.get('/agendamentos/?categoria=' + categoria);
    return response;
}

export const _arquivaAgendamento = async (json) => {
    const response = await connect.post('/arquivo', json);
}

export const _getArquivo = async () => {
    const response = await connect.get('/arquivo');
    return response;
}