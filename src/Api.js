import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://salon-x-server-production.up.railway.app'
})

export const register = async (
    name, 
    email,
    password, 
    confirmpassword
) => {
    return api.post('/register/user', {
        name, 
        email,
        password, 
        confirmpassword
    })
    .catch((error) => {
        if (error) {
            const result = JSON.stringify(
                error.response.data.msg
            )
            alert(result)
            window.location.reload()
        }
    }, [])
}

export const createSession = async (email, password) => {
    
    return api.post('/sessions', {
        email, password
    })
    .catch((error) => {
        if (error) {
            const result = JSON.stringify(
                error.response.data.msg
            )
            alert(result)
            window.location.reload()
        }
    }, [])
}

export const checkToken = async (id, token) => {
    
    return api.post('/refresh', {
        id, token
    })
    .catch((error) => {
        if (error) {
            const result = JSON.stringify(
                error.response.data.msg
            )
            alert(result)
            window.location.reload()
        }
    }, [])
}