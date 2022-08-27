import React from "react";
import { Icon, IconButton, TableCell, TableRow } from "@mui/material";
import { IRows } from "../../interfaces/iRows.interface";

/**
 * List of payments table
 * @param param0
 * @returns
 */
function TableRows({ rows, handleDelete, handleEdit }: IRows): JSX.Element {
  if (rows && rows.length === 0) {
    return <div style={{ marginLeft: 20 }}>No payments</div>;
  }
  return (
    <>
      {rows &&
        rows.length > 0 &&
        rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <IconButton size="small" onClick={() => handleDelete(row.id)}>
                <Icon>delete</Icon>
              </IconButton>
              <IconButton size="small" onClick={() => handleEdit(row)}>
                <Icon>edit</Icon>
              </IconButton>
            </TableCell>
            <TableCell data-testid="users-table">{row.description}</TableCell>
            <TableCell>{row.companyId}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
    </>
  );
}

export default TableRows;
