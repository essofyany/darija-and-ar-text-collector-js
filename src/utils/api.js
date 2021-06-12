import axios from "axios";

const url = "api/labeling";

export const getTweetsAPI = () => axios.get(url);
export const createAPI = (data) => axios.post(url, data);
export const updateAPI = (data) => axios.patch(url, data);
export const deleteAPI = (id) => axios.put(url, { id });
