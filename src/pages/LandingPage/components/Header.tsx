import { Box, Button, Stack, Typography } from "@mui/material";
import { Login, TheatersRounded } from "@mui/icons-material";

const Header = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <TheatersRounded />
        <Typography variant="h6">Favorite Movies & TV Shows</Typography>
      </Stack>
      <Box>
        <Button startIcon={<Login />} variant="outlined">
          Login
        </Button>
      </Box>
    </Stack>
  );
};

export default Header;
