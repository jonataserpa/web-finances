import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { CompanyService } from "../services/CompanyService";
import { useDebounce } from "../../../shared/hooks";
import { IAutoCompleteCompanyProps } from "../interfaces/iAutoCompleteCompanyProps.interface";
import { useFormikContext } from "formik";
import { Environment } from "../../../shared/environment";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

export const AutoCompleteCompany: React.FC<IAutoCompleteCompanyProps> = ({
  isExternalLoading = false,
  error,
  helperText,
  value,
  name,
}) => {
  const { debounce } = useDebounce();
  const formik = useFormikContext();
  const [selectedId, setSelectedId] = useState<number | undefined>(value);

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CompanyService.getAll(1, Environment.LIMITE_DE_LINHAS, busca).then(
        (result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // alert(result.message);
          } else {
            setOpcoes(
              result.data.map((company) => ({
                id: Number(company.id),
                label: company.reasonsocial,
              }))
            );
          }
        }
      );
    });
  }, []);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      options={opcoes}
      size="small"
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        formik.setFieldValue("companyId", newValue?.id);
        setBusca("");
      }}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error && !selectedId}
          helperText={!!error && !selectedId ? helperText : ""}
          label="Empresa"
          name={name}
        />
      )}
    />
  );
};
