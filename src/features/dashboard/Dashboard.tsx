import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { CompanysService } from '../company/services/CompanysService';
import { UsersService } from '../user/services/UsersService';
import { LayoutBasePage } from '../../shared/layouts';
import { ToolList } from '../../shared/components';


export const Dashboard = () => {
  const [isLoadingCompanys, setIsLoadingCompanys] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [totalCountCompanys, setTotalCountCompanys] = useState(0);
  const [totalCountUsers, setTotalCountUsers] = useState(0);

  useEffect(() => {
    setIsLoadingCompanys(true);
    setIsLoadingUsers(true);

    CompanysService.getAll(1)
      .then((result) => {
        setIsLoadingCompanys(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCompanys(result.totalCount);
        }
      });
      
    UsersService.getAll(1)
      .then((result) => {
        setIsLoadingUsers(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountUsers(result.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBasePage
      title='Página inicial'
      toolBars={<ToolList mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Users
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingUsers && (
                      <Typography variant='h1'>
                        {totalCountUsers}
                      </Typography>
                    )}
                    {isLoadingUsers && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Companys
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCompanys && (
                      <Typography variant='h1'>
                        {totalCountCompanys}
                      </Typography>
                    )}
                    {isLoadingCompanys && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
