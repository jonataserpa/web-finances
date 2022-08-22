import 'jest-environment-jsdom'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import TableRows from "../components/table-rows/index";
import { IUser } from '../interfaces/iUser.interface';

const rowsFake: IUser[] = [
    {
        id: '1',
        name: 'John',
        email: 'john@example.com',
    },
    {
        id: '2',
        name: 'Jane',
        email: 'jane@example.com',
    },
];

test('not should render users table', () => {
    const { getByText } = render(<TableRows rows={[]} handleDelete={() => ('1')} handleEdit={() => rowsFake[0].id} />)
    expect(getByText('No users')).toBeInTheDocument()
})

test('should render data users table', () => {
    const { getAllByTestId } = render(<TableRows rows={rowsFake} handleDelete={() => ('1')} handleEdit={() => rowsFake[0].id} />)
    const userTableRows = getAllByTestId('users-table').map((tableCell) => tableCell.textContent)
    const fakeUsersTableRows = rowsFake.map((row) => row.name)
    expect(userTableRows).toEqual(fakeUsersTableRows);
})