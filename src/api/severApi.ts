import { apiClient } from "../configs/http/axios";
import { API_DOMAIN } from "../configs/constant/apiUrl";

const serverAPI = {
  getAllServerByUserId: async (
    userId: string | undefined
  ): Promise<IServer[]> => {
    const response = await apiClient().get<IServer[]>(
      `${API_DOMAIN.SERVER}/by-userId/${userId}`
    );
    return response.data;
  },
  getServerByServerId: async (serverId: string | undefined) => {
    const response = await apiClient().get<IServer>(
      `${API_DOMAIN.SERVER}/by-serverId/${serverId}`
    );
    return response.data;
  },

  createNewServer: async (body: any) => {
    const response = await apiClient().post<any>(API_DOMAIN.SERVER, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default serverAPI;
