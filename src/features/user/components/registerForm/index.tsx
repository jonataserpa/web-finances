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
import { AutoCompleteCompany } from "../../../company/components/AutoCompleteCompany";
import { VDatePicker } from "../../../../shared/forms/VDatePicker";
import { VRadioButton } from "../../../../shared/forms/VRadioButton";
import { VInputPhone } from "../../../../shared/forms/VPhone";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";
import { formValidationSchema } from "../../schema";
import { useVForm, VTextField } from "../../../../shared/forms";
import { useNavigate, useParams } from "react-router-dom";
import { IAdresses } from "../../interfaces/iAdresses";
import { LayoutBasePage } from "../../../../shared/layouts";
import { IRegisterFormProps } from "../../interfaces/iRegisterForm.interface";
import { IUser } from "../../interfaces/iUser.interface";
import { user } from "../../../utils/initialValues";
import getStyle from "../../../utils/styles";

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
}: IRegisterFormProps): JSX.Element {
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
    setDataResponse(user);
    setTitleModal("Novo Usúario");
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
  function validatePayload(payload: IUser): void {
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
    validationSchema: formValidationSchema,
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
            setDataResponse(user);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={getStyle()}>
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
            title={titleModal === "" ? "Novo usúario" : titleModal}
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
                          name="name"
                          type="text"
                          disabled={isLoading}
                          label="Nome completo"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <AutoCompleteCompany
                          isExternalLoading={isLoading}
                          value={formik.values.companyId}
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

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
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

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <VDatePicker
                          fullWidth
                          name="dateborn"
                          label="Data de nascimento"
                          disabled={isLoading}
                          onChange={formik.handleChange}
                          value={formik.values.dateborn}
                          error={
                            formik.touched.dateborn &&
                            Boolean(formik.errors.dateborn)
                          }
                          helperText={
                            formik.touched.dateborn && formik.errors.dateborn
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VRadioButton
                          fullWidth
                          name="radiogender"
                          label="Gênero"
                          disabled={isLoading}
                          onChange={formik.handleChange}
                          value={formik.values.radiogender || ""}
                          error={
                            formik.touched.radiogender &&
                            Boolean(formik.errors.radiogender)
                          }
                          helperText={
                            formik.touched.radiogender &&
                            formik.errors.radiogender
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

                <Box
                  margin={1}
                  display="flex"
                  flexDirection="column"
                  component={Paper}
                  variant="outlined"
                >
                  <Grid container direction="column" padding={2} spacing={2}>
                    <Grid item>
                      <Typography variant="h6">Acesso</Typography>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name="email"
                          type="email"
                          label="Email"
                          disabled={isLoading}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name="password"
                          type="password"
                          label="Password"
                          disabled={isLoading}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
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
                  onClickSaveAndClose={saveAndClose}
                  onClickBack={() => navigate("/users")}
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
