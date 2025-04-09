import axios, { AxiosError } from 'axios'
import { base_url } from './users'
export interface Trip { 
    title: string
    origin: string
    destination: string
    distance_km : number
    start_time : string
    end_time: string | null
    original_price: number
    discounted_price: number,
    slots_left: number,
    image_url: string,
    offerings : string[]
} 

export const addTrip = async (trip: Trip, token: string) => { 
    try { 
        const response = await axios.post(`${base_url}/trips/add`, {...trip}, { 
            headers: { Authorization: `Bearer ${token}`}
        })
        return response
    } catch(error) { 
        console.log(error)
        if(error instanceof AxiosError) return error.response
    }
}

export const getAllTrips = async () => { 
    try { 
        const response = await axios.get(`${base_url}/trips`)
        return response
    } catch(error) { 
        console.log(error)
        if(error instanceof AxiosError) return error.response
    }
}
export const getTripDetailsByTitle = async (title: string) => { 
    try { 
        const response = await axios.get(`${base_url}/trips/${title}`)
        return response
    } catch(error) { 
        console.log(error)
        if(error instanceof AxiosError) return error.response
    }
}

export const getTripsByOriginAndDestination = async (origin: string, destination: string, token: string) => { 
    try { 
        const response = await axios.post(`${base_url}/trips?origin=${origin}&destination=${destination}`,  { 
            headers: { Authorization: `Bearer ${token}`}
        })
        return response
    } catch(error) { 
        console.log(error)
        if(error instanceof AxiosError) return error.response
    }
}

