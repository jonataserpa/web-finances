import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { CompanysService } from "../services/CompanysService";
import { useDebounce } from "../../../shared/hooks";
import { IAutoCompleteCompanyProps } from "../interfaces/iCompany.interface";
import { useFormikContext } from "formik";

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
      CompanysService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          // alert(result.message);
        } else {
          console.log(result);

          setOpcoes(
            result.data.map((Company) => ({
              id: Company.id,
              label: Company.name,
            }))
          );
        }
      });
    });
  }, [busca]);

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
        formik.setFieldValue('companyId', newValue?.id);
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
          helperText={!!error && !selectedId ? helperText : ''}
          label="Company"
          name={name}
        />
      )}
    />
  );
};
