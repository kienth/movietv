import { Alert, AlertTitle } from "@mui/material";

const Error = () => {
  return (
    <Alert severity="error">
      <AlertTitle fontSize={16} sx={{ fontWeight: 600 }}>
        Something went wrong!
      </AlertTitle>
      Please try again later...
    </Alert>
  );
};

export default Error;
