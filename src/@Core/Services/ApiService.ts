import Environment from '../../../Environments';
import DateRange from "../Models/DateRange";

export const api_url = Environment.apiUrl;
const api_data_url = `${api_url}/data/`;

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
   return fetch(url, { headers: { 'user-token': localStorage.getItem('UserToken') }, method: method, body: JSON.stringify(obj) })
      .then(res => {
         if (res.status === 400 || res.status === 401) {
            localStorage.removeItem('UserToken');
            window.location.reload();
         }
         return res.json();
      });
}