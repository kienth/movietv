import { useSearchParams } from "react-router";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Add, Search } from "@mui/icons-material";

import { useUpdateSearchParam } from "../../../utils/url";
import type { ILandingPage } from "../_landingPage";

interface IFilter {
  handleOpen: ({
    id,
    data,
  }: {
    id: null | number;
    data: null | ILandingPage;
  }) => void;
}

const Filter = (props: IFilter) => {
  const updateSearchParam = useUpdateSearchParam();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <Stack direction={{ md: "row", xs: "column" }} alignItems="end" spacing={2}>
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
      <Button
        startIcon={<Add />}
        variant="contained"
        sx={{ width: { md: 200, xs: "fit-content" }, float: "right" }}
        onClick={() => props.handleOpen({ id: null, data: null })}
      >
        Add New Entry
      </Button>
    </Stack>
  );
};

export default Filter;
