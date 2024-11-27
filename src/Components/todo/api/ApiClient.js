import axios from 'axios'
const apiClient = axios.create({
    baseURL:'http://localhost:5469'
})
export default apiClient