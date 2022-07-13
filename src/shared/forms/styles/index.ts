import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  inputPhoneError: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#9D1111",
      },
    },
  },
});
