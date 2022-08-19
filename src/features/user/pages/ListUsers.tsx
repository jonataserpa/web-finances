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
import CloseIcon from "@mui/icons-material/Close";

import * as yup from "yup";

import { CompanysService } from "../../company/services/CompanysService";
import { UsersService } from "../services/UsersService";
import { Environment } from "../../../shared/environment";
import { LayoutBasePage } from "../../../shared/layouts";
import { IUser } from "../interfaces/iUser.interface";
import { ToolDetail, ToolList } from "../../../shared/components";
import { useDebounce } from "../../../shared/hooks";
import { useVForm, VForm, VTextField } from "../../../shared/forms";
import { AutoCompleteCompany } from "../../company/components/AutoCompleteCompany";
import { VDatePicker } from "../../../shared/forms/VDatePicker";
import { VRadioButton } from "../../../shared/forms/VRadioButton";
import { VInputPhone } from "../../../shared/forms/VPhone";
import { IAdresses } from "../interfaces/IAdresses";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";

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
  email: "",
  phone: "",
  companyId: undefined,
  dateborn: "",
  radiogender: "",
  address,
};

export const ListUsers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const { save, saveAndClose, update } = useVForm();
  const { id = "nova" } = useParams<"id">();
  const [rows, setRows] = useState<IUser[]>([]);
  const [dataResponse, setDataResponse] = useState<IUser>(user);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [titleModal, setTitleModal] = useState("");

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

  /**
   * Handle delete item
   * @param id
   */
  const handleDelete = (id: string | undefined) => {
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

  /**
   * Validate payload
   * @param payload
   */
  function validatePayload(payload: any): void {
    setIsLoading(true);
    if (payload.id === "" || payload.id === undefined) {
      save(payload);
    } else {
      update(payload);
    }
    setIsLoading(false);
    handleClose();
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

  /**
   * Handle close modal dialog
   */
  const handleClose = () => {
    setOpen(false);
    setDataResponse(user);
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
                      value={address.address}
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

  /**
   * Edit user modal dialog
   */
  async function handleEdit(user: IUser) {
    setTitleModal("Edit User");
    setDataResponse(user);
    setTimeout(() => {
      handleOpen();
    }, 100);
  }

  return (
    <LayoutBasePage
      title="Listagem de Úsuarios"
      toolBars={
        <ToolList
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarEmNovo={handleOpen}
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
                  <IconButton size="small" onClick={() => handleEdit(row)}>
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
          onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
              setDataResponse(user);
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
            <LayoutBasePage title={titleModal === "" ? "New user" : titleModal}>
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

                  <ToolDetail
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== "nova"}
                    mostrarBotaoApagar={id !== "nova"}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate("/pessoas")}
                    aoClicarEmApagar={() => handleDelete(id)}
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
