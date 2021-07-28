import http from '.';

export const getHelpList = async () => await http.get('/order');

export const getRescueList = async () => await http.get('/rescue');
