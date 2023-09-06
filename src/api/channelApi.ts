import { apiClient } from "../configs/http/axios";
import { API_DOMAIN } from "../configs/constant/apiUrl";

const channelAPI = {
  getAllChannelByServer: async (serverId: string | undefined) => {
    const response = await apiClient.get<IChannel[]>(
      `${API_DOMAIN.CHANNEL}/server/${serverId}`
    );
    return response.data;
  },
  getChannelByChannelId: async (channelId: string | undefined) => {
    const response = await apiClient.get<IChannel>(
      `${API_DOMAIN.CHANNEL}/${channelId}`
    );
    return response.data;
  },

  createNewChannel: async (body: any) => {
    const response = await apiClient.post<any>(API_DOMAIN.CHANNEL, body);
    return response.data;
  },
};

export default channelAPI;
