import { Api } from '../../../shared/services/axios-config';
import { Environment } from '../../../shared/enviroment';


export interface IListUser {
  id: number;
  email: string;
  companyId: number;
  name: string;
}

export interface IDetailUser {
  id: number;
  email: string;
  companyId: number;
  name: string;
}

type TUserWithTotalCount = {
  data: IListUser[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TUserWithTotalCount | Error> => {
  try {
    const url = `/users?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;

    const { data, headers } = await Api.get(url);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetailUser | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetailUser, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailUser>('/users', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetailUser): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/users/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const UsersService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
