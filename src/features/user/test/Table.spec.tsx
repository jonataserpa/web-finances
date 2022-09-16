import React from "react";
import "jest-environment-jsdom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TableRows from "../components/table-rows/index";
import { IUser } from "../interfaces/iUser.interface";

/**
 * data mock
 */
const rowsMock: IUser[] = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@example.com",
  },
];

/**
 * Not data table users
 */
test("not should render users table", () => {
  const { getByText } = render(
    <TableRows
      rows={[]}
      handleDelete={() => "1"}
      handleEdit={() => rowsMock[0].id}
    />
  );
  expect(getByText("No users")).toBeInTheDocument();
});

/**
 * Users data table
 */
test("should render data users table", () => {
  const { getAllByTestId } = render(
    <TableRows
      rows={rowsMock}
      handleDelete={() => "1"}
      handleEdit={() => rowsMock[0].id}
    />
  );
  const userTableRows = getAllByTestId("users-table").map(
    (tableCell) => tableCell.textContent
  );
  const fakeUsersTableRows = rowsMock.map((row) => row.name);
  expect(userTableRows).toEqual(fakeUsersTableRows);
});
