import http from '@/plugins/api'

export default  {
    async fetchReleation() {
        return await http('v1/relations', {},'GET')
    },
    async updateRelation(requesterId, someoneId, status) {
        return await http('v1/users/signup',{requesterId:requesterId, someoneId:someoneId, status:status} , 'post')
    }
}
