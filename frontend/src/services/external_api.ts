import axios from 'axios';
import { IPersonCreate, IPeople } from '../pages/Home/People.interface';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  

interface Person {
  id_pessoa: number;
  nome: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  data_admissao: string;
  funcao: string;
}

export const fetchPeopleData = async (): Promise<Person[]> => {
  try {
    const response = await api.get(`people`);
    return response.data as Person[];
  } catch (error) {
    console.log(error.response)
    throw new Error(`Error fetching people data: ${error.message}`);
  }
};

export const deletePerson = async (id_pessoa: number): Promise<Person[]> => {
  try {
    const response = await api.delete(`people/${id_pessoa}`);
    return response.data as Person[];
  } catch (error) {
    console.log(error.response)
    throw new Error(`Error deleting people data: ${error.message}`);
  }
};

export const updatePerson = async (person: IPeople): Promise<Person[]> => {
  try {
    const response = await api.put(`people/${person.id_pessoa}`, person);
    return response.data as Person[];
  } catch (error) {
    console.log(error.response)
    throw new Error(`Error updating people data: ${error.message}`);
  }
};

export const getPerson = async (id_pessoa: number): Promise<Person> => {
  try {
    const response = await api.get(`people/${id_pessoa}`);
    return response.data as Person;
  } catch (error: any) {
    console.log(error.response)
    throw new Error(`Error fetching people data: ${error.message}`);
  }
};

export const createPerson = async (person: IPersonCreate): Promise<Person[]> => {
  try {
    const response = await api.post(`people`, person);
    return response.data as Person[];
  } catch (error) {
    console.log(error.response)
    throw new Error(`Error updating people data: ${error.message}`);
  }
};
