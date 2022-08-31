import React from "react";
import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IToolDetailProps {
  textButtonNew?: string;

  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonClean?: boolean;
  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;

  showButtonNewLoading?: boolean;
  showButtonBackLoading?: boolean;
  showButtonCleanLoading?: boolean;
  showButtonSaveLoading?: boolean;
  showButtonSaveAndCloseLoading?: boolean;

  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickClean?: () => void;
  onClickSave?: () => void;
  onClickSaveAndClose?: () => void;
}
export const ToolDetail: React.FC<IToolDetailProps> = ({
  textButtonNew = "Novo",

  showButtonNew = true,
  showButtonBack = true,
  showButtonClean = true,
  showButtonSave = true,
  showButtonSaveAndClose = false,

  showButtonNewLoading = false,
  showButtonBackLoading = false,
  showButtonCleanLoading = false,
  showButtonSaveLoading = false,
  showButtonSaveAndCloseLoading = false,

  onClickNew,
  onClickBack,
  onClickClean,
  onClickSaveAndClose,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      marginTop={20}
      height={theme.spacing(5)}
      component={Paper}
    >
      {showButtonSave && !showButtonSaveLoading && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          type="submit"
          // onClick={onClickSave}
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
        </Button>
      )}

      {showButtonSaveLoading && <Skeleton width={110} height={60} />}

      {showButtonSaveAndClose &&
        !showButtonSaveAndCloseLoading &&
        !smDown &&
        !mdDown && (
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            onClick={onClickSaveAndClose}
            startIcon={<Icon>save</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e fechar
            </Typography>
          </Button>
        )}

      {showButtonSaveAndCloseLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showButtonClean && !showButtonCleanLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickClean}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showButtonCleanLoading && <Skeleton width={110} height={60} />}

      {showButtonNew && !showButtonNewLoading && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textButtonNew}
          </Typography>
        </Button>
      )}

      {showButtonNewLoading && !smDown && <Skeleton width={110} height={60} />}

      {showButtonBack &&
        (showButtonNew ||
          showButtonClean ||
          showButtonSave ||
          showButtonSaveAndClose) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showButtonBack && !showButtonBackLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showButtonBackLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
