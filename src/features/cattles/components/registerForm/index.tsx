import React, { useEffect, useState } from "react";
import { IRegisterFormCattlesProps } from "../../interfaces/iIRegisterFormCattlesProps.interface";
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
import { cattleInitial } from "../../../utils/initialValues";
import { LayoutBasePage } from "../../../../shared/layouts";
import { ToolDetail } from "../../../../shared/components";
import { ICombineState } from "../../../../store/reducers";
import { useParams } from "react-router-dom";
import { VTextField } from "../../../../shared/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";
import allActions from "../../../../store/actions";
import { VDatePicker } from "../../../../shared/forms/VDatePicker";
import getStyle from "../../../utils/styles";
import { ICattlesProps } from "../../interfaces/iCattles.interface";
import { CattlesService } from "../../services/CattlesService";
import { formValidationSchemaCattles } from "../../schemas";
import { IChildrenProps } from "../../interfaces/iChildren.interface";

function RegisterForm({
  setIsLoading,
  isLoading,
  getAllUsers,
  handleDelete,
  open,
  setOpen,
  setTitleModal,
  titleModal,
}: IRegisterFormCattlesProps): JSX.Element {
  const dispatch = useDispatch();

  const { cattles } = useSelector((state: ICombineState) => state.cattles);
  const { id = "nova" } = useParams<"id">();
  const [dataResponse, setDataResponse] = useState<ICattlesProps>(cattles);

  /**
   * Update the payment state value
   * @param {ICombineState} state
   */
  useEffect(() => {
    if (cattles) {
      setDataResponse(cattles);
      formik.values = cattles;
    }
  }, [cattles, dataResponse]);

  /**
   * Handle close modal dialog
   */
  const handleClose = () => {
    setOpen(false);
    setDataResponse(cattleInitial);
    dispatch(allActions.cattles.setCattles(cattleInitial));
    setTitleModal("Novo Cadastro");
    formik.resetForm();
  };

  /**
   * Validate payload
   * @param payload
   */
  async function validatePayload(payload: ICattlesProps): Promise<void> {
    setIsLoading(true);
    if (payload.id === "" || payload.id === undefined) {
      let newValue = payload;
      if (payload.children.length === 1 && payload.children[0].name === "") {
        newValue = { ...payload, children: [] };
      }
      newValue.children?.map((childre) => {
        return {
          id: childre.id,
          name: childre.name,
          dateborn: childre.dateborn,
          namefather: childre.namefather,
          observacion: childre.observacion,
          proprietary: childre.proprietary,
        };
      });
      await CattlesService.create(newValue);
    } else {
      const childrens: IChildrenProps[] | undefined = [];
      payload.children?.forEach((childre) => {
        const adrs = {
          id: childre.id,
          name: childre.name,
          dateborn: childre.dateborn,
          namefather: childre.namefather,
          observacion: childre.observacion,
          proprietary: childre.proprietary,
          cattlesId: Number(payload.id),
        };

        childrens.push(adrs);
      });
      payload.children = childrens;
      await CattlesService.updateById(payload.id, payload);
    }
    setIsLoading(false);
    handleClose();
    getAllUsers();
  }

  /**
   * Add item array children
   */
  function addSon(arrayHelpers: FieldArrayRenderProps): void {
    arrayHelpers.push({
      id: uuidv4(),
      name: "",
      namefather: "",
      dateborn: "",
      observacion: "",
      proprietary: "",
    });
  }

  function listChildren(): JSX.Element {
    return (
      <FieldArray
        name="children"
        render={(arrayHelpers) => (
          <>
            {formik.values.children?.map(
              (son: IChildrenProps, index: number) => (
                <div key={son.id}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                      <VTextField
                        fullWidth
                        id={`children[${index}].name`}
                        name={`children[${index}].name`}
                        type="text"
                        label="Nome"
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={son.name}
                        error={
                          Boolean(
                            getIn(formik.errors, `children[${index}].name`)
                          ) &&
                          Boolean(
                            getIn(formik.touched, `children[${index}].name`)
                          )
                        }
                        helperText={
                          Boolean(
                            getIn(formik.errors, `children[${index}].name`)
                          ) &&
                          Boolean(
                            getIn(formik.touched, `children[${index}].name`)
                          )
                            ? getIn(formik.errors, `children[${index}].name`)
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <VTextField
                        fullWidth
                        id={`children[${index}].namefather`}
                        name={`children[${index}].namefather`}
                        type="text"
                        label="Nome do pai"
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={son.namefather}
                        error={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].namefather`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].namefather`
                            )
                          )
                        }
                        helperText={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].namefather`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].namefather`
                            )
                          )
                            ? getIn(
                                formik.errors,
                                `children[${index}].namefather`
                              )
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={1}>
                      <VTextField
                        fullWidth
                        id={`children[${index}].proprietary`}
                        name={`children[${index}].proprietary`}
                        type="text"
                        label="Proprietário"
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={son.proprietary}
                        error={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].proprietary`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].proprietary`
                            )
                          )
                        }
                        helperText={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].proprietary`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].proprietary`
                            )
                          )
                            ? getIn(
                                formik.errors,
                                `children[${index}].proprietary`
                              )
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                      <VTextField
                        fullWidth
                        id={`children[${index}].observacion`}
                        name={`children[${index}].observacion`}
                        type="text"
                        label="Observação"
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={son.observacion}
                        error={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].observacion`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].observacion`
                            )
                          )
                        }
                        helperText={
                          Boolean(
                            getIn(
                              formik.errors,
                              `children[${index}].observacion`
                            )
                          ) &&
                          Boolean(
                            getIn(
                              formik.touched,
                              `children[${index}].observacion`
                            )
                          )
                            ? getIn(
                                formik.errors,
                                `children[${index}].observacion`
                              )
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                      <VDatePicker
                        fullWidth
                        label="Data de nascimento"
                        id={`children[${index}].dateborn`}
                        name={`children[${index}].dateborn`}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={son.dateborn}
                        error={
                          Boolean(
                            getIn(formik.errors, `children[${index}].dateborn`)
                          ) &&
                          Boolean(
                            getIn(formik.touched, `children[${index}].dateborn`)
                          )
                        }
                        helperText={
                          Boolean(
                            getIn(formik.errors, `children[${index}].dateborn`)
                          ) &&
                          Boolean(
                            getIn(formik.touched, `children[${index}].dateborn`)
                          )
                            ? getIn(
                                formik.errors,
                                `children[${index}].dateborn`
                              )
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
                        onClick={() => addSon(arrayHelpers)}
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
              )
            )}
          </>
        )}
      />
    );
  }

  /**
   * formik initialValues
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...dataResponse },
    validationSchema: formValidationSchemaCattles,
    onSubmit: (values) => {
      validatePayload(values);
      formik.resetForm();
      cattleInitial;
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
            setDataResponse(cattleInitial);
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
            title={titleModal === "" ? "Novo Pagamento" : titleModal}
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
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <VTextField
                          fullWidth
                          name="name"
                          type="text"
                          disabled={isLoading}
                          label="Nome"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <VTextField
                          fullWidth
                          name="namefather"
                          type="text"
                          disabled={isLoading}
                          label="Nome do boi"
                          onChange={formik.handleChange}
                          value={formik.values.namefather}
                          error={
                            formik.touched.namefather &&
                            Boolean(formik.errors.namefather)
                          }
                          helperText={
                            formik.touched.namefather &&
                            formik.errors.namefather
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={6}>
                        <VTextField
                          fullWidth
                          name="proprietary"
                          type="text"
                          disabled={isLoading}
                          label="Proprietário"
                          onChange={formik.handleChange}
                          value={formik.values.proprietary}
                          error={
                            formik.touched.proprietary &&
                            Boolean(formik.errors.proprietary)
                          }
                          helperText={
                            formik.touched.proprietary &&
                            formik.errors.proprietary
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={6}>
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

                <Box
                  margin={1}
                  display="flex"
                  flexDirection="column"
                  component={Paper}
                  variant="outlined"
                >
                  <Grid container direction="column" padding={2} spacing={2}>
                    <Grid item>
                      <Typography variant="h6">Bezerros</Typography>
                    </Grid>
                    <Grid item>{listChildren()}</Grid>
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
