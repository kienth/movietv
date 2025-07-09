import { Box, Stack, Typography } from "@mui/material";

const Card = () => {
  return (
    <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
      <Box border="1px solid lightgrey" borderRadius={2} p={2} width={1}>
        <Typography variant="subtitle1">100</Typography>
        <Typography variant="body2">Total Entries</Typography>
      </Box>
      <Box border="1px solid lightgrey" borderRadius={2} p={2} width={1}>
        <Typography variant="subtitle1">52</Typography>
        <Typography variant="body2">Total Entries</Typography>
      </Box>
      <Box border="1px solid lightgrey" borderRadius={2} p={2} width={1}>
        <Typography variant="subtitle1">48</Typography>
        <Typography variant="body2">Total Entries</Typography>
      </Box>
    </Stack>
  );
};

export default Card;
