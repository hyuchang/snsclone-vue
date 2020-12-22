import http from '@/plugins/api'

export default {
    async fetchData(body) {
        return await http(`v1/posts?page=${body.page}`, {}, 'GET')
    },
    async fetchBySomeData(body) {
        return await http(`v1/posts/users/${body.someId}?page=${body.page}`, {}, 'GET')
    },
    async like(item) {
        return await http(`v1/posts/${item.id}/like`, {}, 'POST')
    },
    async unlike(item) {
        return await http(`v1/posts/${item.id}/unlike`, {}, 'POST')
    },
    async createComment(comment) {
        return await http(`v1/post/${comment.id}/comments`, {comment:comment.comment}, 'POST')
    },
    async createPost(postBody) {
        return await http(`v1/posts`, postBody, 'POST')
    },
    async deleteComment(id) {
        return await http(`v1/post/${id}`, {}, 'DELETE')
    },
}