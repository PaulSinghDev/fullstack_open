import axios from "axios";
const baseUrl = "/api/persons";
console.log(baseUrl);
const getAll = async () => {
  const request = axios.get(baseUrl);
  const fakeRecord = { id: 999, name: "Not-on Server", number: '07878797865' };
  return request.then((response) => response.data.concat(fakeRecord));
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
