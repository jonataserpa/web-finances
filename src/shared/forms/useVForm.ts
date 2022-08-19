import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../../features/user/services/UsersService";

export const useVForm = () => {
  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);
  const navigate = useNavigate();

  const handleSave = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;

    try {
      const data = await UsersService.create(values);
      console.log(data);
      navigate("/users");
    } catch (error) {}
  }, []);

  const handleUpdate = useCallback(async (values: any) => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;

    try {
      const data = await UsersService.updateById(values.id, values);
      console.log(data);
      navigate("/users");
    } catch (error) {}
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
