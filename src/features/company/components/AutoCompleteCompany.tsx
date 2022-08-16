import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { CompanysService } from "../services/CompanysService";
import { useDebounce } from "../../../shared/hooks";
import { IAutoCompleteCompanyProps } from "../interfaces/iCompany.interface";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

export const AutoCompleteCompany: React.FC<IAutoCompleteCompanyProps> = ({
  isExternalLoading = false,
}) => {
  // const { fieldName, registerField, defaultValue, error, clearError } =
  //   useField("companyId");
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(
    1
  );

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     getValue: () => selectedId,
  //     setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
  //   });
  // }, [registerField, fieldName, selectedId]);

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
          label="Company"
        />
      )}
    />
  );
};
