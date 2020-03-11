import { AsyncStorage } from 'react-native';
import Environment from '../../../Environments';
import DateRange from "../Models/DateRange";

export const api_url = Environment.apiUrl;
const api_data_url = `${api_url}/data/`;
let token = async () => await (JSON.parse(await AsyncStorage.getItem('user-token')));
// let token = async () => await (await AsyncStorage.getItem('user-token')).slice(1, token.length - 1);

export const sortTypes = {
   Ascending: ' asc',
   Descending: ' desc'
};

export function getApiUrlSimple(tableName, query = null) {
   return query ? `${api_data_url + tableName}?${query}` : api_data_url + tableName;
}

export function getApiUrl(tableName, dateRange = new DateRange(), sortBy, sortType = sortTypes.Ascending) {
   return `${api_data_url + tableName}?pageSize=100&sortBy=${sortBy + sortType}&where=on_date>=${dateRange.startDate.valueOf()}%26%26on_date<=${dateRange.endDate.valueOf()}`;
}

export function getApiUrlById(tableName, id) {
   return `${api_data_url + tableName}/${id}`;
}

export async function FetchAsync(url, method, obj = null) {
   const usertoken = await token();
   return fetch(url, { headers: { 'user-token': usertoken }, method: method, body: obj ? JSON.stringify(obj) : null })
      .then(res => {
         // if (res.status === 400 || res.status === 401) {
         //    localStorage.removeItem('UserToken');
         //    window.location.reload();
         // }
         return res.json();
      });
}