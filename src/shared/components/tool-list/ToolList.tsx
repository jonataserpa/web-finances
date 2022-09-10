import React from "react";
import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

import { Environment } from "../../environment";

interface IToolListProps {
  textSearch?: string;
  showInputSearch?: boolean;
  changeTextSearch?: (novoTexto: string) => void;
  textButtonNew?: string;
  showButtonNew?: boolean;
  clickNew?: () => void;
}

export const ToolList: React.FC<IToolListProps> = ({
  textSearch = "",
  changeTextSearch,
  showInputSearch = false,
  clickNew,
  textButtonNew = "Novo",
  showButtonNew = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          size="small"
          value={textSearch}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => changeTextSearch?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showButtonNew && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={clickNew}
            endIcon={<Icon>add</Icon>}
          >
            {textButtonNew}
          </Button>
        )}
      </Box>
    </Box>
  );
};
