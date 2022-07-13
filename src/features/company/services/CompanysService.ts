import { Api } from "../../../shared/services/axios-config";
import { Environment } from "../../../shared/environment";

export interface IListCompany {
  id: number;
  name: string;
}

export interface IDetailCompany {
  id: number;
  name: string;
}

type TCompanyWithTotalCount = {
  data: IListCompany[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCompanyWithTotalCount | Error> => {
  try {
    const url = `/companys?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;

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
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetailCompany | Error> => {
  try {
    const { data } = await Api.get(`/companys/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetailCompany, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailCompany>("/companys", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetailCompany
): Promise<void | Error> => {
  try {
    await Api.put(`/companys/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/companys/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const CompanysService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
