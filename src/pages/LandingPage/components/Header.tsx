import { Stack, Typography } from "@mui/material";
import { TheatersRounded } from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <TheatersRounded />
          <Typography variant="h6">Favorite Movies & TV Shows</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
