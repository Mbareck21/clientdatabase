import { TextField } from "@mui/material";

// custom textfield component
const CustomTextField = (props) => {
  return (
    <TextField
      variant="outlined"
      spellCheck="false"
      sx={{ width: 200 }} // apply some styles
      {...props} // pass the rest of the props
    />
  );
};

export default CustomTextField;
