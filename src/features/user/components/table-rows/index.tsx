import { Icon, IconButton, TableCell, TableRow } from "@mui/material";
import { IUser } from "../../interfaces/iUser.interface";

export interface IRows {
  rows: IUser[];
  handleDelete: (id: string | undefined) => void;
  handleEdit: (user: IUser) => void;
}

function TableRows({ rows, handleDelete, handleEdit }: IRows): JSX.Element {
  if (rows && rows.length === 0) {
    return <div>No users</div>;
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
            <TableCell data-testid='users-table'>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
    </>
  );
}

export default TableRows;
