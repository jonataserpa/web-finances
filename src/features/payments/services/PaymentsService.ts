import { ApiService } from "../../../shared/services/axios-config";
import { Environment } from "../../../shared/environment";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IPaymentsProps } from "../interfaces/iPayments.interface";
import { directionOfSort } from "../../user/services/UsersService";

export type TPaymentsWithTotalCount = {
  data: IPaymentsProps[];
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

const getAll = async (
  skip: number,
  take: number,
  filter: string,
  sortDirection?: directionOfSort
): Promise<TPaymentsWithTotalCount | Error> => {
  try {
    // const url = `/payments?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&description_like=${filter}`;
    // const { data, headers } = await ApiService.get(url);

    const url = "/payment";

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

const getById = async (id: number): Promise<IPaymentsProps | Error> => {
  try {
    const { data } = await ApiService.get(`/payment/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao consultar o registro.");
    throw error;
  }
};

const create = async (
  dados: Omit<IPaymentsProps, "id">
): Promise<string | Error> => {
  try {
    const { data } = await ApiService.post("/payment", dados);

    if (data) {
      toast.success("Pagamento criado com sucesso.");
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao criar o registro.");
    throw error;
  }
};

const updateById = async (
  id: string,
  dados: IPaymentsProps
): Promise<void | Error> => {
  try {
    await ApiService.put(`/payment/${id}`, dados);
    toast.success("Pagamento atualizado com sucesso.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao atualizar o registro.");
    throw error;
  }
};

const deleteById = async (id: string | undefined): Promise<void | Error> => {
  try {
    await ApiService.delete(`/payment/`, id);
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao apagar o registro.");
    throw error;
  }
};

export const PaymentsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
