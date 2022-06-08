import { Routes, Route, Navigate } from 'react-router-dom';

import { Button } from '@mui/material';

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/dashboard" element={<p>Home <Button>Dashboard</Button></p>} />
            <Route path="/company" element={<p>Company <Button>Company</Button></p>} />
            <Route path="/user" element={<p>Users <Button>Usuarios</Button></p>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}