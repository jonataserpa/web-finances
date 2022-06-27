import { useEffect, useMemo, useState } from 'react';
import { Box, Fab, FormControlLabel, Grid, Icon, IconButton, LinearProgress, Modal, Pagination, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import * as yup from 'yup';

import { CompanysService, } from '../../company/services/CompanysService';
import { IListUser, UsersService, } from '../services/UsersService';
import { Environment } from '../../../shared/environment';
import { LayoutBasePage } from '../../../shared/layouts';
import { IUser } from '../interfaces/iUser.interface';
import { ToolDetail, ToolList } from '../../../shared/components';
import { useDebounce } from '../../../shared/hooks';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../../shared/forms';
import { AutoCompleteCompany } from '../../company/components/AutoCompleteCompany';
import { VDatePicker } from '../../../shared/forms/VDatePicker';
import { VRadioButton } from '../../../shared/forms/VRadioButton';

const formValidationSchema: yup.SchemaOf<IUser | any> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  companyId: yup.number().required(),
  dateborn: yup.string().required(),
  radiogender: yup.string().required(),
});

export const ListUsers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const { id = 'nova' } = useParams<'id'>();

  const [rows, setRows] = useState<IListUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nome, setNome] = useState('');

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      UsersService.getAll(pagina, busca)
        .then((result) => {
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
    if (confirm('Realmente deseja apagar?')) {
      CompanysService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            alert('Registro apagado com sucesso!');
          }
        });
    }
  };

  const handleSave = (dados: IUser) => {

    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        console.log(dadosValidados)

        // if (id === 'nova') {
        //   PessoasService
        //     .create(dadosValidados)
        //     .then((result) => {
        //       setIsLoading(false);

        //       if (result instanceof Error) {
        //         alert(result.message);
        //       } else {
        //         if (isSaveAndClose()) {
        //           navigate('/pessoas');
        //         } else {
        //           navigate(`/pessoas/detalhe/${result}`);
        //         }
        //       }
        //     });
        // } else {
        //   PessoasService
        //     .updateById(Number(id), { id: Number(id), ...dadosValidados })
        //     .then((result) => {
        //       setIsLoading(false);

        //       if (result instanceof Error) {
        //         alert(result.message);
        //       } else {
        //         if (isSaveAndClose()) {
        //           navigate('/pessoas');
        //         }
        //       }
        //     });
        // }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors)
        formRef.current?.setErrors(validationErrors);
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

  return (
    <LayoutBasePage
      title='Listagem de Úsuarios'
      toolBars={
        <ToolList
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='Nova'
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
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
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
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
            <LayoutBasePage
              title={id === 'nova' ? 'New user' : nome}
            >
              <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                  <Grid container direction="column" padding={2} spacing={2}>

                    {isLoading && (
                      <Grid item>
                        <LinearProgress variant='indeterminate' />
                      </Grid>
                    )}

                    <Grid item>
                      <Typography variant='h6'>Geral</Typography>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                        <VTextField
                          fullWidth
                          name='name'
                          disabled={isLoading}
                          label='Nome completo'
                          onChange={e => setNome(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name='email'
                          label='Email'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <VTextField
                          fullWidth
                          name='cel'
                          label='Celular'
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <AutoCompleteCompany isExternalLoading={isLoading} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <VDatePicker
                          fullWidth
                          name='dateborn'
                          label='Data de nascimento'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VRadioButton 
                          fullWidth
                          name='radiogender'
                          label='Gênero'
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>

                  </Grid>
                </Box>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                  <Grid container direction="column" padding={2} spacing={2}>
                    <Grid item>
                      <Typography variant='h6'>Endereços</Typography>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                        <VTextField
                          fullWidth
                          name='cep'
                          label='Cep'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name='logradouro'
                          label='Endereço'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={1}>
                        <VTextField
                          fullWidth
                          name='number'
                          label='Nº'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={1}>
                        <VTextField
                          fullWidth
                          name='state'
                          label='UF'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <VTextField
                          fullWidth
                          name='city'
                          label='Cidade'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={1}>
                        <Fab color="primary" aria-label="add">
                          <AddIcon />
                        </Fab>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                  <Grid container direction="column" padding={2} spacing={2}>
                    <Grid item>
                      <Typography variant='h6'>Acesso</Typography>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name='email'
                          label='Email'
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <VTextField
                          fullWidth
                          name='password'
                          label='Password'
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </VForm>

              <ToolDetail
                textoBotaoNovo='Nova'
                mostrarBotaoSalvarEFechar
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}

                aoClicarEmSalvar={save}
                aoClicarEmSalvarEFechar={saveAndClose}
                aoClicarEmVoltar={() => navigate('/pessoas')}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
              />
            </LayoutBasePage>
          </Box>
        </Modal>
      </TableContainer>
    </LayoutBasePage>
  );
};
