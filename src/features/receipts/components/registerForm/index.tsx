import React, { useEffect, useState } from "react";
import { IReceiveProps } from "../../interfaces/iReceive.interface";
import {
  Box,
  Grid,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { receiptsInital, statusReceipt } from "../../../utils/initialValues";
import { LayoutBasePage } from "../../../../shared/layouts";
import { ToolDetail } from "../../../../shared/components";
import { ICombineState } from "../../../../store/reducers";
import { useParams } from "react-router-dom";
import { VTextField } from "../../../../shared/forms";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { FormikProvider, useFormik } from "formik";
import { formValidationSchemaReceipt } from "../../schemas";
import { AutoCompleteCompany } from "../../../company/components/AutoCompleteCompany";
import { VSelectStatus } from "../../../../shared/forms/VStatus";
import { IRegisterFormReceiveProps } from "../../interfaces/iIRegisterFormReceiveProps.interface";
import { ReceiptsService } from "../../services/ReceiptsService";
import allActions from "../../../../store/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

function RegisterForm({
  setIsLoading,
  isLoading,
  getAllUsers,
  handleDelete,
  open,
  setOpen,
  setTitleModal,
  titleModal,
}: IRegisterFormReceiveProps): JSX.Element {
  const dispatch = useDispatch();

  const { receipt } = useSelector((state: ICombineState) => state.receipt);
  const { id = "nova" } = useParams<"id">();
  const [dataResponse, setDataResponse] = useState<IReceiveProps>(receipt);

  /**
   * Update the receipt state value
   * @param {ICombineState} state
   */
  useEffect(() => {
    if (receipt) {
      setDataResponse(receipt);
      formik.values = receipt;
    }
  }, [receipt, dataResponse]);

  /**
   * Handle close modal dialog
   */
  const handleClose = () => {
    setOpen(false);
    setDataResponse(() => receiptsInital);
    dispatch(allActions.receipt.setReceipt(false, receiptsInital));
    setTitleModal("Nova Entrada");
    formik.resetForm();
  };

  /**
   * Validate payload
   * @param payload
   */
  async function validatePayload(payload: IReceiveProps): Promise<void> {
    setIsLoading(true);
    if (payload.id === "" || payload.id === undefined) {
      await ReceiptsService.create(payload);
    } else {
      await ReceiptsService.updateById(payload.id, payload);
    }
    setIsLoading(false);
    handleClose();
    getAllUsers();
  }

  /**
   * formik initialValues
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...dataResponse },
    validationSchema: formValidationSchemaReceipt,
    onSubmit: (values) => {
      validatePayload(values);
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
            setDataResponse(receiptsInital);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              cursor: "pointer",
            }}
          />
          <LayoutBasePage
            title={titleModal === "" ? "Nova Entrada" : titleModal}
          >
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Box
                  margin={1}
                  display="flex"
                  flexDirection="column"
                  component={Paper}
                  variant="outlined"
                >
                  <Grid container direction="column" padding={2} spacing={2}>
                    {isLoading && (
                      <Grid item>
                        <LinearProgress variant="indeterminate" />
                      </Grid>
                    )}

                    <Grid item>
                      <Typography variant="h6">Geral</Typography>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VTextField
                          fullWidth
                          name="description"
                          type="text"
                          disabled={isLoading}
                          label="Descrição"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                          }
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <AutoCompleteCompany
                          isExternalLoading={isLoading}
                          value={Number(formik.values.companyId)}
                          name="companyId"
                          error={
                            formik.touched.companyId &&
                            Boolean(formik.errors.companyId)
                          }
                          helperText={
                            formik.touched.companyId && formik.errors.companyId
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VTextField
                          fullWidth
                          name="value"
                          type="text"
                          disabled={isLoading}
                          label="Valor"
                          onChange={formik.handleChange}
                          value={formik.values.value}
                          error={
                            formik.touched.value && Boolean(formik.errors.value)
                          }
                          helperText={
                            formik.touched.value && formik.errors.value
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <VSelectStatus
                          fullWidth
                          name="status"
                          type="text"
                          disabled={isLoading}
                          label="Status"
                          onChange={formik.handleChange}
                          value={formik.values.status}
                          items={statusReceipt}
                          error={
                            formik.touched.status &&
                            Boolean(formik.errors.status)
                          }
                          helperText={
                            formik.touched.status && formik.errors.status
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                        <VTextField
                          fullWidth
                          name="observacion"
                          type="text"
                          disabled={isLoading}
                          label="Observação"
                          onChange={formik.handleChange}
                          value={formik.values.observacion}
                          error={
                            formik.touched.observacion &&
                            Boolean(formik.errors.observacion)
                          }
                          helperText={
                            formik.touched.observacion &&
                            formik.errors.observacion
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                <ToolDetail
                  textButtonNew="Nova"
                  showButtonSaveAndClose
                  showButtonNew={id !== "nova"}
                  showButtonClean={id !== "nova"}
                  onClickBack={() => setOpen(false)}
                  onClickClean={() => handleDelete(id)}
                />
              </form>
            </FormikProvider>
          </LayoutBasePage>
        </Box>
      </Modal>
    </>
  );
}

export default RegisterForm;
