import { getSession } from "next-auth/react";
import axios from "axios";

export default function useApi(){

    const bolaoApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BOLAO_API || 'http://localhost:5000/',
        headers: {
            'Content-type': 'application/json',
        }
    })

    const requestHandler = async request => {
        const token = await getSession()
        request.headers.Authorization = `Bearer ${token.accessToken}`

        return request
    }

    const errorHandler = error => {
        return Promise.reject(error)
    }

    bolaoApi.interceptors.request.use(
        request => requestHandler(request),
        error => errorHandler(error)        
    )

    return { bolaoApi }
}