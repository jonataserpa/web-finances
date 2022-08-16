import { alertClasses } from "@mui/material";
import { FormikHandlers } from "formik";
import { useCallback, useRef } from "react";

export const useVForm = () => {
  const formRef = useRef<FormikHandlers>(null);
  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = true;
    // formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;
    // formRef.current?.submitForm();
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

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};
