import { ApiService } from "../../../shared/services/axios-config";
import { IUser } from "../interfaces/iUser.interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type TUserWithTotalCount = {
  data: IUser[];
  totalCount: number;
};

export type directionOfSort = "ASC" | "DESC" | undefined;

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
  } else {
    toast.error("Erro de conexão.");
  }
};

/**
 * Get all users
 * @param page
 * @param filter
 * @returns
 */
const getAll = async (
  skip: number,
  take: number,
  filter: string,
  sortDirection?: directionOfSort
): Promise<TUserWithTotalCount | Error> => {
  try {
    const url = `/user`;

    const { data } = await ApiService.get(url, {
      params: { skip, take, filter, sortDirection },
    });
    if (data) {
      return {
        data: data.data,
        totalCount: data.headers,
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
    const { data } = await ApiService.get(`/user/${id}`);

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
    const { data } = await ApiService.post("/user", user);

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
    await ApiService.put(`/user/${id}`, user);
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
    await ApiService.delete(`/user/`, id);
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
