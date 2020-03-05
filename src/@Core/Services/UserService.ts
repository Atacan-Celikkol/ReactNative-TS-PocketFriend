import { UserLoginRequest, UserRegisterRequest } from '../Models/User';
import { api_url } from './ApiService';

const tableName = 'users';

export async function LoginAsync(request: UserLoginRequest) {
   const url = api_url + '/' + tableName + '/login';
   return fetch(url, {
      method: 'post',
      body: JSON.stringify(request)
   }).then(res => res.json());
}

export async function RegisterAsync(request: UserRegisterRequest) {
   const url = api_url + '/' + tableName + '/register';
   return fetch(url, {
      method: 'post',
      body: JSON.stringify(request)
   }).then(res => res.json());
}