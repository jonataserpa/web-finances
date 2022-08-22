import "jest-environment-jsdom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableRows from "../components/table-rows/index";
import { IUser } from "../interfaces/iUser.interface";
import { VTextField } from "../../../shared/forms";

/**
 * data mock
 */
const rowsMock: IUser[] = [
  {
    id: "1",
    name: "John",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Jane",
    email: "jane@example.com",
  },
];

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

describe("validate component VTextField", () => {
  test("renders an input label", () => {
    render(
      <VTextField
        name="name"
        type="text"
        label="Name label"
        value="Test default"
        error={undefined}
        helperText="error message"
      />
    );

    const label = screen.getByLabelText("Name label");
    expect(label).toBeInTheDocument();
  });

  test("renders an input value", () => {
    render(
      <VTextField
        name="name"
        type="text"
        label="Name label"
        value="Test default"
        error={undefined}
        helperText=""
      />
    );

    const value = screen.getByDisplayValue("Test default");
    expect(value).toBeInTheDocument();
  });

  test("renders an error message section empty", () => {
    render(
      <VTextField
        name="name"
        type="text"
        label="Name label"
        value=""
        error={false}
        helperText="error message"
        role="alert"
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("error message");
  });
});
