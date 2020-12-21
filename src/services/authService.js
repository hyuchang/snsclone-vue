import http from '@/plugins/api'

export default {
    async login(body){
        return await http( 'v1/users/signin', body, 'post')
    },
    async signup(body){
        return await http( 'v1/users/signup', body, 'post')
    },
    token:{
        commit(token){
            localStorage.setItem('jwt-access',token.accessToken);
            localStorage.setItem('jwt-refresh',token.refreshToken);
            localStorage.setItem('jwt-expiration',token.expiration);
        },
        fetch(){
            return {
                accessToken:localStorage.getItem('jwt-access'),
                refreshToken:localStorage.getItem('jwt-refresh'),
                expired:localStorage.getItem('jwt-expiration')
            }
        }
    }
}