import React, { useEffect, useState } from "react";
import { IRegisterFormPaymentProps } from "../../interfaces/iIRegisterFormPaymentProps.interface";
import { IPaymentsProps } from "../../interfaces/iPayments.interface";
import { Box, fabClasses, Grid, LinearProgress, Modal, Paper, Typography } from "@mui/material";
import { PaymentsService } from "../../services/PaymentsService";
import { paymentInital } from "../../../utils/initialValues";
import { LayoutBasePage } from "../../../../shared/layouts";
import { ToolDetail } from "../../../../shared/components";
import { ICombineState } from "../../../../store/reducers";
import { useNavigate, useParams } from "react-router-dom";
import { VTextField } from "../../../../shared/forms";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { FormikProvider, useFormik } from "formik";
import { formValidationSchemaPayment } from "../../schemas";
import { AutoCompleteCompany } from "../../../company/components/AutoCompleteCompany";

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
}: IRegisterFormPaymentProps): JSX.Element {
  const navigate = useNavigate();
  const { payment, openModal } = useSelector((state: ICombineState) => state.payment);
  const { id = "nova" } = useParams<"id">();
  const [dataResponse, setDataResponse] = useState<IPaymentsProps>(payment);

  /**
   * Update the payment state value
   * @param {ICombineState} state
   */
  useEffect(() => {
    if (payment) {
        setDataResponse(payment);
        formik.values = payment;
        console.log('payment', payment);
        console.log('formik', formik.values);
    }
  },[payment, dataResponse])

  /**
   * Update the payment initial state values
   * @param {ICombineState} state
   */
  useEffect(() => {
    if (!openModal) {
        setDataResponse(paymentInital);
    }
  },[openModal])

  /**
   * Handle close modal dialog
   */
  const handleClose = () => {
    setOpen(false);
    setDataResponse(paymentInital);
    setTitleModal("Novo Pagamento");
    formik.resetForm();
  };

  /**
   * Validate payload
   * @param payload
   */
  async function validatePayload(payload: IPaymentsProps): Promise<void> {
    setIsLoading(true);
    if (payload.id === "" || payload.id === undefined) {
      await PaymentsService.create(payload);
    } else {
      await PaymentsService.updateById(payload.id, payload);
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
    validationSchema: formValidationSchemaPayment,
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
            setDataResponse(paymentInital);
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
            title={titleModal === "" ? "Nova Empresa" : titleModal}
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
                            formik.touched.value &&
                            Boolean(formik.errors.value)
                          }
                          helperText={
                            formik.touched.value &&
                            formik.errors.value
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <VTextField
                          fullWidth
                          name="observacion"
                          type="text"
                          disabled={isLoading}
                          label="Observação"
                          onChange={formik.handleChange}
                          value={formik.values.observacion}
                          error={
                            formik.touched.observacion && Boolean(formik.errors.observacion)
                          }
                          helperText={
                            formik.touched.observacion && formik.errors.observacion
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
