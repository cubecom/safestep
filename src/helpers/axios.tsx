import axios from 'axios';

// SERVDIOR 
export const server = 'https://safestep.herokuapp.com';
const baseURL = `${server}/api`;

// // PRUEBA
// export const server = 'http://192.168.0.104:8000';
// const baseURL = `${server}/api`;

const axiosApi = axios.create({ baseURL });

export const axiosConToken = async (endpoint: string, data: any = null, method = 'GET') => {
    const url = `${baseURL}${endpoint}`;
    const token = await localStorage.getItem('token') || '';

    if (method === 'GET') {
        const config = {
            method,
            url,
            headers: {
                'x-token': token
            }
        };
        return axios(config).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    } else {
        const config = {
            method,
            url,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            data
        };
        return axios(config).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    }
}

// SOLO: para subir imagenes con cuerpo
export const fetchConToken = async (endPoint: string, method = 'GET', data: any) => {
    const token = await localStorage.getItem('token') || '';

    return fetch(`${baseURL}${endPoint}`, {
        method,
        headers: {
            'x-token': token
        },
        body: data
    }).then(res => res.json())
        .then(res => { return res })
        .catch(err => { return err })
}

export default axiosApi;
