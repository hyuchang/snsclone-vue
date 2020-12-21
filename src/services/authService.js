import http from '@/plugins/api'

const tokenService = {
    commit(token, user) {
        localStorage.setItem('jwt-access', token.accessToken);
        localStorage.setItem('jwt-refresh', token.refreshToken);
        localStorage.setItem('jwt-expiration', token.expiration);
        localStorage.setItem('nickname', user.nickname);
        localStorage.setItem('uid', user.id);
    },
    fetchToken() {
        return {
            accessToken: localStorage.getItem('jwt-access'),
            refreshToken: localStorage.getItem('jwt-refresh'),
            expired: localStorage.getItem('jwt-expiration')
        }
    },
    fetchUser() {
        return {
            nickname: localStorage.getItem('nickname'),
            uid: localStorage.getItem('uid')
        }
    },

}

const apiService = {
    async login(body) {
        return await http('v1/users/signin', body, 'post')
    },
    async signup(body) {
        return await http('v1/users/signup', body, 'post')
    }
}

export {tokenService,apiService}