import { useSearchParams } from "react-router";
import { Button, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { Add, Search } from "@mui/icons-material";

import { useUpdateSearchParam } from "../../../utils/url";

const Filter = () => {
  const updateSearchParam = useUpdateSearchParam();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 9, xs: 12 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by title, director, or location..."
          defaultValue={search}
          onChange={(e) => {
            updateSearchParam({ key: "search", value: e.target.value });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <Stack alignItems="end" justifyContent="center" height={1}>
          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{ width: { md: 1, xs: "fit-content" } }}
          >
            Add New Entry
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Filter;
