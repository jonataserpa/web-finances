import React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { UsersService } from "../services/UsersService";
import { Environment } from "../../../shared/environment";
import { LayoutBasePage } from "../../../shared/layouts";
import { IUser } from "../interfaces/iUser.interface";
import { ToolList } from "../../../shared/components";
import { useDebounce } from "../../../shared/hooks";
import TableRows from "../components/table-rows";
import RegisterForm, { user } from "../components/registerForm";

export const ListUsers: React.FC = () => {
  const [dataResponse, setDataResponse] = useState<IUser>(user);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [titleModal, setTitleModal] = useState("");
  const [rows, setRows] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  /**
   * Search default values
   */
  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  /**
   * Search page values
   */
  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  /**
   * Get all users
   */
  function getAllUsers() {
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
  }

  /**
   * Define default values list loading
   */
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [busca, pagina]);

  /**
   * Handle delete item
   * @param id
   */
  const handleDelete = (id: string | undefined) => {
    if (confirm("Realmente deseja apagar?")) {
      UsersService.deleteById(id).then((result) => {
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
   * Edit user modal dialog
   */
  function handleEdit(user: IUser) {
    setTitleModal("Edite Usúario");
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
          showInputSearch
          textSearch={busca}
          textButtonNew="Nova"
          clickNew={handleOpen}
          changeTextSearch={(texto) =>
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
            <TableRows
              rows={rows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
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

        <RegisterForm
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          getAllUsers={getAllUsers}
          handleDelete={handleDelete}
          handleOpen={handleOpen}
          open={open}
          setOpen={setOpen}
          setTitleModal={setTitleModal}
          titleModal={titleModal}
          dataResponse={dataResponse}
          setDataResponse={setDataResponse}
        />
      </TableContainer>
    </LayoutBasePage>
  );
};
