import { AxiosError } from "axios";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersService } from "../../features/user/services/UsersService";

/**
 * Handle api errors
 * @param error
 */
export const handleApiErrors = (error: AxiosError) => {
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
        toast.error(
          "Problema ao processar sua requisição, por favor tente novamente!"
        );
        break;
    }
  }
};

export const useVForm = () => {
  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);
  const navigate = useNavigate();

  const handleSave = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;

    try {
      await UsersService.create(values);
      toast.success("Usúario criado com sucesso.");
    } catch (error: unknown) {
      handleApiErrors(error as AxiosError);
      throw error;
    }
  }, []);

  const handleUpdate = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;

    try {
      await UsersService.updateById(values.id, values);
      toast.success("Usúario atualizado com sucesso.");
    } catch (error: unknown) {
      handleApiErrors(error as AxiosError);
      throw error;
    }
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = true;
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,
    update: handleUpdate,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};
