import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addOne = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteOne = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateOne = async (updatedObject) => {
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject);
  return request.then((response) => response.data);
};

export default { getAll, addOne, deleteOne, updateOne };
