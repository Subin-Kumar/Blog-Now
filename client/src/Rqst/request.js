import axios from 'axios'

const Base_Url="http://localhost:5000/api/"

export const publicRequest=axios.create({baseURL:Base_Url})

var Token=JSON.parse(JSON.parse(localStorage.getItem('persist:BlogNow1')).BcData).Data[0] &&
JSON.parse(JSON.parse(localStorage.getItem('persist:BlogNow1')).BcData).Data[0].accesstoken
console.log("Token----",Token);


export const userRequest=axios.create({
    baseURL:Base_Url,
    headers:{token:`Bearer ${Token}`}
})