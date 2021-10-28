import axios from "axios";

export const getJobList = (params) => {
    return axios.get(`https://www.themuse.com/api/public/jobs?${params}&api_key=f23aa0ac7ddd9df5ec3fb2e17caedcce3e24a058dda9850e152b0b5c5bf543f5`);
}

export const getCompanyById = (id) => {
    return axios.get(`https://www.themuse.com/api/public/companies/${id}?api_key=f23aa0ac7ddd9df5ec3fb2e17caedcce3e24a058dda9850e152b0b5c5bf543f5`);
}

export const testAPI = () => {
    return axios.get(`https://www.themuse.com/api/public/jobs?category=Data%20Science&level=Senior%20Level&location=Silicon%20Valley,%20CA&page=1&api_key=f23aa0ac7ddd9df5ec3fb2e17caedcce3e24a058dda9850e152b0b5c5bf543f5`);
}

testAPI()
    .then((res) => {
        console.log('test API', res.data);
        res.data = {
            ...res.data,
            items_per_page: 5
        }
        console.log('test API 2', res.data);
    })