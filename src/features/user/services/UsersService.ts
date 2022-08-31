import { Api } from "../../../shared/services/axios-config";
import { Environment } from "../../../shared/environment";
import { IUser } from "../interfaces/iUser.interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type TUserWithTotalCount = {
  data: IUser[];
  totalCount: number;
};

/**
 * Handle api errors
 * @param error
 */
export const handleApiErrors = (error: AxiosError, message: string) => {
  if (error && error.response && error.response.data) {
    switch (error.response.data.statusCode) {
      case 400:
        toast.error(
          "Erro ao processar a requisição, verifique os dados enviados e tente novamente!"
        );
        break;
      case 404:
        toast.error("Usuario não encontrado");
        break;
      case 500:
        toast.error(
          "Erro, o servidor não conseguiu processar a requisição, por favor tente novamente mais tarde ou contate o suporte!"
        );
        break;
      default:
        toast.error(message);
        break;
    }
  }
};

/**
 * Get all users
 * @param page
 * @param filter
 * @returns
 */
const getAll = async (
  page = 1,
  filter = ""
): Promise<TUserWithTotalCount | Error> => {
  try {
    const url = `/users?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;

    const { data, headers } = await Api.get(url);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao listar os registros.");
    throw error;
  }
};

/**
 * Get by id user
 * @param id
 * @returns
 */
const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao consultar o registro.");
    throw error;
  }
};

/**
 * Create user
 * @param user
 * @returns
 */
const create = async (
  user: Omit<IUser, "id">
): Promise<string | undefined | Error> => {
  try {
    const { data } = await Api.post<IUser>("/users", user);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao criar o registro.");
    throw error;
  }
};

/**
 * Update user
 * @param id
 * @param user
 */
const updateById = async (id: number, user: IUser): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, user);
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao atualizar o registro.");
    throw error;
  }
};

/**
 * Delete user
 * @param id
 */
const deleteById = async (id: string | undefined): Promise<void | Error> => {
  try {
    await Api.delete(`/users/${id}`);
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao apagar o registro.");
    throw error;
  }
};

export const UsersService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
