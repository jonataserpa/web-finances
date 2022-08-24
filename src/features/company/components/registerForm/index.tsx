import React from "react";
import {
  Box,
  Grid,
  Icon,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ToolDetail } from "../../../../shared/components";
import { VInputPhone } from "../../../../shared/forms/VPhone";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";
import { useVForm, VTextField } from "../../../../shared/forms";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../../../shared/layouts";
import { IAdresses } from "../../../user/interfaces/iAdresses";
import { company } from "../../../utils/initialValues";
import { IRegisterFormCompanyProps } from "../../interfaces/iRegisterForm.interface";
import { ICompanyProps } from "../../interfaces/iCompany.interface";
import { formValidationSchemaCompany } from "../../schema";

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

/**
 * Register form user
 * @param params
 * @returns
 */
function RegisterForm({
  setIsLoading,
  isLoading,
  getAllUsers,
  handleDelete,
  open,
  setOpen,
  setTitleModal,
  titleModal,
  dataResponse,
  setDataResponse,
}: IRegisterFormCompanyProps): JSX.Element {
  const { save, saveAndClose, update } = useVForm();
  const navigate = useNavigate();
  const { id = "nova" } = useParams<"id">();

  /**
   * Add item array address
   */
  function addAdrees(arrayHelpers: FieldArrayRenderProps): void {
    arrayHelpers.push({
      id: uuidv4(),
      cep: "",
      adrees: "",
      number_end: "",
      state: "",
      city: "",
    });
  }

  /**
   * Handle close modal dialog
   */
  const handleClose = () => {
    setOpen(false);
    setDataResponse(company);
    setTitleModal("Nova Empresa");
    formik.resetForm();
  };

  /**
   * List addrees
   * @returns
   */
  function listAdrees(): JSX.Element {
    return (
      <FieldArray
        name="address"
        render={(arrayHelpers) => (
          <>
            {formik.values.address?.map((address: IAdresses, index: number) => (
              <div key={address.id}>
                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].cep`}
                      name={`address[${index}].cep`}
                      type="text"
                      label="Cep"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.cep}
                      error={
                        Boolean(
                          getIn(formik.errors, `address[${index}].cep`)
                        ) &&
                        Boolean(getIn(formik.touched, `address[${index}].cep`))
                      }
                      helperText={
                        Boolean(
                          getIn(formik.errors, `address[${index}].cep`)
                        ) &&
                        Boolean(getIn(formik.touched, `address[${index}].cep`))
                          ? getIn(formik.errors, `address[${index}].cep`)
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].adrees`}
                      name={`address[${index}].adrees`}
                      type="text"
                      label="Endereço"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.adrees}
                      error={
                        Boolean(
                          getIn(formik.errors, `address[${index}].adrees`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].adrees`)
                        )
                      }
                      helperText={
                        Boolean(
                          getIn(formik.errors, `address[${index}].adrees`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].adrees`)
                        )
                          ? getIn(formik.errors, `address[${index}].adrees`)
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={1}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].number_end`}
                      name={`address[${index}].number_end`}
                      type="text"
                      label="Nº"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.number_end}
                      error={
                        Boolean(
                          getIn(formik.errors, `address[${index}].number_end`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].number_end`)
                        )
                      }
                      helperText={
                        Boolean(
                          getIn(formik.errors, `address[${index}].number_end`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].number_end`)
                        )
                          ? getIn(formik.errors, `address[${index}].number_end`)
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].state`}
                      name={`address[${index}].state`}
                      type="text"
                      label="UF"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.state}
                      error={
                        Boolean(
                          getIn(formik.errors, `address[${index}].state`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].state`)
                        )
                      }
                      helperText={
                        Boolean(
                          getIn(formik.errors, `address[${index}].state`)
                        ) &&
                        Boolean(
                          getIn(formik.touched, `address[${index}].state`)
                        )
                          ? getIn(formik.errors, `address[${index}].state`)
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].city`}
                      name={`address[${index}].city`}
                      type="text"
                      label="Cidade"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.city}
                      error={
                        Boolean(
                          getIn(formik.errors, `address[${index}].city`)
                        ) &&
                        Boolean(getIn(formik.touched, `address[${index}].city`))
                      }
                      helperText={
                        Boolean(
                          getIn(formik.errors, `address[${index}].city`)
                        ) &&
                        Boolean(getIn(formik.touched, `address[${index}].city`))
                          ? getIn(formik.errors, `address[${index}].city`)
                          : ""
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={2}
                    style={{ marginTop: 10, padding: 10 }}
                  >
                    <Icon
                      sx={{ fontSize: 30 }}
                      onClick={() => addAdrees(arrayHelpers)}
                      color="primary"
                      style={{ cursor: "pointer" }}
                    >
                      add_circle
                    </Icon>

                    {index > 0 && (
                      <RemoveCircleOutlineIcon
                        sx={{ fontSize: 30 }}
                        color="primary"
                        onClick={() => arrayHelpers.remove(index)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Grid>
                </Grid>
              </div>
            ))}
          </>
        )}
      />
    );
  }

  /**
   * Validate payload
   * @param payload
   */
  function validatePayload(payload: ICompanyProps): void {
    setIsLoading(true);
    if (payload.id === "" || payload.id === undefined) {
      save(payload);
    } else {
      update(payload);
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
    validationSchema: formValidationSchemaCompany,
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
            setDataResponse(company);
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
                          name="reasonsocial"
                          type="text"
                          disabled={isLoading}
                          label="Razão social"
                          onChange={formik.handleChange}
                          value={formik.values.reasonsocial}
                          error={
                            formik.touched.reasonsocial &&
                            Boolean(formik.errors.reasonsocial)
                          }
                          helperText={
                            formik.touched.reasonsocial &&
                            formik.errors.reasonsocial
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VTextField
                          fullWidth
                          name="namefantasy"
                          type="text"
                          disabled={isLoading}
                          label="Nome fantasia"
                          onChange={formik.handleChange}
                          value={formik.values.namefantasy}
                          error={
                            formik.touched.namefantasy &&
                            Boolean(formik.errors.namefantasy)
                          }
                          helperText={
                            formik.touched.namefantasy &&
                            formik.errors.namefantasy
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VTextField
                          fullWidth
                          name="CNPJ"
                          type="text"
                          disabled={isLoading}
                          label="CNPJ"
                          onChange={formik.handleChange}
                          value={formik.values.CNPJ}
                          error={
                            formik.touched.CNPJ && Boolean(formik.errors.CNPJ)
                          }
                          helperText={formik.touched.CNPJ && formik.errors.CNPJ}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VInputPhone
                          fullWidth
                          name="phone"
                          label="Celular"
                          disabled={isLoading}
                          variant="outlined"
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  margin={1}
                  display="flex"
                  flexDirection="column"
                  component={Paper}
                  variant="outlined"
                >
                  <Grid container direction="column" padding={2} spacing={2}>
                    <Grid item>
                      <Typography variant="h6">Endereços</Typography>
                    </Grid>
                    <Grid item>{listAdrees()}</Grid>
                  </Grid>
                </Box>

                <ToolDetail
                  textButtonNew="Nova"
                  showButtonSaveAndClose
                  showButtonNew={id !== "nova"}
                  showButtonClean={id !== "nova"}
                  onClickSaveAndClose={saveAndClose}
                  onClickBack={() => navigate("/pessoas")}
                  onClickClean={() => handleDelete(id)}
                  onClickNew={() => navigate("/pessoas/detalhe/nova")}
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
