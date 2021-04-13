export const formataMoeda = function (v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{1,2})$/, ',$1');
    v = v.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1');
    if (v.length < 4) { v = '00' + v } else { v = v.replace(/^[0]{1}/, ''); }
    return v
}