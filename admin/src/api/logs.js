import axiosInstance from '../../src/utils/axiosInstance';

const logsRequest = {
  getLogs: async () => {
    const data = await axiosInstance.get(`/strapi-audit-logs/list`);
    return data;
  },
  getLog: async (id) => {
    const data = await axiosInstance.get(`/strapi-audit-logs/fetch/${id}`);
    return data;
  },
};

export default logsRequest;