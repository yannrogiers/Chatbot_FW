import axios from 'axios/index'

export const register = newUser => {
    return axios
        .post('https://infinite-castle-02083.herokuapp.com/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log('registered')
        })
}

export const login = user => {
    return axios
        .post('https://infinite-castle-02083.herokuapp.com/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}