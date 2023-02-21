import axiosInstance from '../../src/utils/axiosInstance';

const logsRequest = {
  getLogs: async (params) => {
    const response = await axiosInstance.get(`/strapi-audit-logs/list`, {params});
    return response;
  },
  getLog: async (id) => {
    const response = await axiosInstance.get(`/strapi-audit-logs/fetch/${id}`);
    return response;
  },
};

export default logsRequest;