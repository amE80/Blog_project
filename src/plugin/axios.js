import axios from "axios";


// This is your base url
const BASE_URL = 'https://api.realworld.io/api/';
// Token should be changed
let token = ''
if(localStorage.getItem('token')){
   token = localStorage.getItem('token')
}else{
    token=''
}
export const axiosAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        withCredentials: true,
        // There is token which you should add hen you login to website
        // I put it empty as default but you need to change it!
        "Authorization": `Bearer ${token}`
    }
});