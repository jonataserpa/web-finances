import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  LinearProgress,
  Modal,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import * as yup from "yup";

import { CompanysService } from "../../company/services/CompanysService";
import { IListUser, UsersService } from "../services/UsersService";
import { Environment } from "../../../shared/environment";
import { LayoutBasePage } from "../../../shared/layouts";
import { IUser } from "../interfaces/iUser.interface";
import { ToolDetail, ToolList } from "../../../shared/components";
import { useDebounce } from "../../../shared/hooks";
import {
  IVFormErrors,
  useVForm,
  VForm,
  VTextField,
} from "../../../shared/forms";
import { AutoCompleteCompany } from "../../company/components/AutoCompleteCompany";
import { VDatePicker } from "../../../shared/forms/VDatePicker";
import { VRadioButton } from "../../../shared/forms/VRadioButton";
import { VInputPhone } from "../../../shared/forms/VPhone";
import { IAdresses } from "../interfaces/IAdresses";
import { Scope } from "@unform/core";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../store/actions";
import { ICombineState } from "../../../store/reducers";
import { FieldArray, FieldArrayRenderProps, FormikProvider, getIn, useFormik } from "formik";

const formValidationSchema: yup.SchemaOf<IUser | any> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  companyId: yup.number().required(),
  dateborn: yup.string().required().nullable(),
  radiogender: yup.string().required(),
  phone: yup.string().required(),
  address: yup.array(
    yup.object({
      id: yup.string(),
      cep: yup.string().required(),
      adrees: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    })
  ),
});

export const ListUsers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const { save, saveAndClose } = useVForm();
  const dispatch = useDispatch();

  const address = [
    {
      id: uuidv4(),
      cep: "",
      adrees: "",
      number_end: "",
      state: "",
      city: "",
    },
  ];

  const user = {
    name: "",
    email: "jonataser@gmail.com",
    phone: "",
    companyId: undefined,
    dateborn: "",
    radiogender: "",
    address,
  };

  const { id = "nova" } = useParams<"id">();

  const [rows, setRows] = useState<IListUser[]>([]);
  const [dataResponse, setDataResponse] = useState<IUser>(user);

  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nome, setNome] = useState("");

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      UsersService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      CompanysService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          alert("Registro apagado com sucesso!");
        }
      });
    }
  };

  // function save(values: IUser): void {
  //   console.log(values);
  // }

  // /**
  //  * Save user
  //  * @param dados
  //  */
  // const handleSave = (dados: IUser) => {
  //   formValidationSchema
  //     .validate(dados, { abortEarly: false })
  //     .then((dadosValidados) => {
  //       setIsLoading(true);
  //       console.log(dadosValidados);

  //       // if (id === 'nova') {
  //       //   PessoasService
  //       //     .create(dadosValidados)
  //       //     .then((result) => {
  //       //       setIsLoading(false);

  //       //       if (result instanceof Error) {
  //       //         alert(result.message);
  //       //       } else {
  //       //         if (isSaveAndClose()) {
  //       //           navigate('/pessoas');
  //       //         } else {
  //       //           navigate(`/pessoas/detalhe/${result}`);
  //       //         }
  //       //       }
  //       //     });
  //       // } else {
  //       //   PessoasService
  //       //     .updateById(Number(id), { id: Number(id), ...dadosValidados })
  //       //     .then((result) => {
  //       //       setIsLoading(false);

  //       //       if (result instanceof Error) {
  //       //         alert(result.message);
  //       //       } else {
  //       //         if (isSaveAndClose()) {
  //       //           navigate('/pessoas');
  //       //         }
  //       //       }
  //       //     });
  //       // }
  //     })
  //     .catch((errors: yup.ValidationError) => {
  //       const validationErrors: IVFormErrors = {};

  //       errors.inner.forEach((error) => {
  //         if (!error.path) return;
  //         validationErrors[error.path] = error.message;
  //       });
  //       console.log("adresses", errors.value.address);
  //       // formRef.current?.setErrors(validationErrors);
  //       dispatch(allActions.user.setUser(true, errors.value.address));
  //     });
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

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
   * Remove item array address
   */
  function removeAdrees(arrayHelpers: any, index: number): void {
    arrayHelpers.remove(index);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...dataResponse },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      save(values);
    },
  });

  /**
   * List addrees
   * @param item
   * @param index
   * @returns
   */
  function listAdrees(newAdress: IAdresses, index: number): JSX.Element {
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
                      error={Boolean(
                        getIn(formik.errors, `address[${index}].cep`)
                      )}
                      helperText={getIn(formik.errors, `address[${index}].cep`)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].adrees`}
                      name={`address[${index}].adrees`}
                      type="text"
                      label="Endereço"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.address}
                      error={Boolean(
                        getIn(formik.errors, `address[${index}].adrees`)
                      )}
                      helperText={getIn(formik.errors, `address[${index}].adrees`)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      fullWidth
                      id={`address[${index}].number_end`}
                      name={`address[${index}].number_end`}
                      type="text"
                      label="Nº"
                      disabled={isLoading}
                      onChange={formik.handleChange}
                      value={address.number_end}
                      error={Boolean(
                        getIn(formik.errors, `address[${index}].number_end`)
                      )}
                      helperText={getIn(formik.errors, `address[${index}].number_end`)}
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
                      error={Boolean(
                        getIn(formik.errors, `address[${index}].state`)
                      )}
                      helperText={getIn(formik.errors, `address[${index}].state`)}
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
                      error={Boolean(
                        getIn(formik.errors, `address[${index}].city`)
                      )}
                      helperText={getIn(formik.errors, `address[${index}].city`)}
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
                        onClick={() => removeAdrees(arrayHelpers, index)}
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

  return (
    <LayoutBasePage
      title="Listagem de Úsuarios"
      toolBars={
        <ToolList
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={handleOpen}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LayoutBasePage title={id === "nova" ? "New user" : nome}>
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
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
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
                              formik.touched.companyId &&
                              formik.errors.companyId
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
                              formik.touched.phone &&
                              Boolean(formik.errors.phone)
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

                      {/* {dataResponse?.address?.map((item, index) => */}
                        {listAdrees()}
                      {/* )} */}
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
                              formik.touched.email &&
                              Boolean(formik.errors.email)
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

                  {/* <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    type="submit"
                    // onClick={aoClicarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                  >
                    <Typography
                      variant="button"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      Salvar
                    </Typography>
                  </Button> */}

                  <ToolDetail
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate("/pessoas")}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                  />
                </form>
              </FormikProvider>
            </LayoutBasePage>
          </Box>
        </Modal>
      </TableContainer>
    </LayoutBasePage>
  );
};
