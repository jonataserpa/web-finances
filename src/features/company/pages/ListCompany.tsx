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
import { CompanyService } from "../services/CompanyService";
import { Environment } from "../../../shared/environment";
import { LayoutBasePage } from "../../../shared/layouts";
import { ToolList } from "../../../shared/components";
import { useDebounce } from "../../../shared/hooks";
import TableRows from "../components/table-rows";
import RegisterForm from "../components/registerForm";
import { ICompanyProps } from "../interfaces/iCompany.interface";
import { address, calcPagination, company } from "../../utils/initialValues";

export const ListCompany: React.FC = () => {
  const [dataResponse, setDataResponse] = useState<ICompanyProps>(company);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [titleModal, setTitleModal] = useState("");
  const [rows, setRows] = useState<ICompanyProps[]>([]);
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
    return Number(searchParams.get("pagina") || "0");
  }, [searchParams]);

  /**
   * Get all users
   */
  function getAllCompanys() {
    debounce(() => {
      CompanyService.getAll(
        calcPagination(pagina),
        Environment.LIMITE_DE_LINHAS,
        busca
      ).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
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
    getAllCompanys();
  }, [busca, pagina]);

  /**
   * Handle delete item
   * @param id
   */
  const handleDelete = (id: string | undefined) => {
    if (confirm("Realmente deseja apagar?")) {
      CompanyService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id.toString() !== id),
          ]);
          alert("Registro apagado com sucesso!");
        }
      });
    }
  };

  /**
   * Edit company modal dialog
   */
  function handleEdit(company: ICompanyProps) {
    setTitleModal("Edite Empresa");
    if (company.address && company.address.length === 0) {
      company.address = address;
    }
    setDataResponse(company);
    setTimeout(() => {
      handleOpen();
    }, 100);
  }

  return (
    <LayoutBasePage
      title="Listagem de Empresas"
      toolBars={
        <ToolList
          showInputSearch
          textSearch={busca}
          textButtonNew="Nova"
          clickNew={handleOpen}
          changeTextSearch={(texto) =>
            setSearchParams({ busca: texto, pagina: "0" }, { replace: true })
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
              <TableCell>Razão social</TableCell>
              <TableCell>CNPJ</TableCell>
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
          getAllCompanys={getAllCompanys}
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
