import React from "react";
import { ReactNode } from "react";
import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import { useDrawerContext } from "../contexts";

interface ILayoutBasePageProps {
  title: string;
  toolBars?: ReactNode;
  children: React.ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  title,
  toolBars,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 4 : mdDown ? 6 : 10)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipses"
          variant={smDown ? "h3" : mdDown ? "h3" : "h4"}
        >
          {title}
        </Typography>
      </Box>

      {toolBars && <Box>{toolBars}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
