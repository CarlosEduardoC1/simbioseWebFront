import connect from '../../services';

export const _getAgendamentos = async () => {
    const response = await connect.get('/agendamentos/get-schedule');
    return response;
}

export const _deletaAgendamento = async (id) => {
    const response = await connect.delete('/agendamentos/delete-schedule/' + id);
    return response;
}

export const _filtroPorCategoria = async (categoria) => {
    console.log(categoria);
    const response = await connect.post('/agendamentos/filter-schedule/' + categoria);
    return response;
}

export const _arquivaAgendamento = async (json) => {
    const response = await connect.post('/arquivo/save-archive', json);
}

export const _getArquivo = async () => {
    const response = await connect.get('/arquivo/get-archive');
    return response;
}

export const _deletaArquivo = async (id) => {
    const response = await connect.delete('/arquivo/delete-archive/' + id);
    return response;
}