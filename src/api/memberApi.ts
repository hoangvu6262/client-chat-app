import { apiClient } from '../configs/http/axios'
import { API_DOMAIN } from '../configs/constant/apiUrl'

const memberAPI = {
    addNewMemberToServer: async (body: any) => {
        const response = await apiClient().post<any>(API_DOMAIN.MEMBER, body)
        return response.data
    },
}

export default memberAPI
