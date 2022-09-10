import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { UsersService } from "../../features/user/services/UsersService";

export const useVForm = () => {
  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    await UsersService.create(values);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    await UsersService.updateById(values.id, values);
    toast.success("Usúario atualizado com sucesso.");
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
