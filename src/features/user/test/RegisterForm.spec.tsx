import React from 'react';
import "jest-environment-jsdom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { VTextField } from "../../../shared/forms";

/**
 * Validate component VTextField
 */
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
