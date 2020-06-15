import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addOne = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const deleteOne = (id) => {};

const updateOne = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request.then(response => response.data);
};

export default { getAll, addOne, deleteOne, updateOne };
