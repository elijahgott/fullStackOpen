import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const createPerson = newObject => {
    return axios.post(baseUrl, newObject);
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson);
}

export default {getAll, createPerson, deletePerson, updatePerson}