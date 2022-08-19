import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  inputPhoneError: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#9D1111",
      },
      "&.Mui-error fieldset": {
        borderColor: "#9D1111",
      },
    },
    "& label.Mui-focused": {
      color: "#9D1111",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiFormHelperText-root": {
      color: "#9D1111",
      width: 300,
    },
  },
});
