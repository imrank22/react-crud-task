import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

const fetchUsers = () => {
    return new Promise(async (resolve, reject)=>{
        await axios.get(`${BASE_URL}/users`)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
    })
}


export {fetchUsers}