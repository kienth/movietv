import { useSearchParams } from "react-router-dom";
import { MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";

import { useUpdateSearchParam } from "../utils/url";

interface ICustomPagination {
  total?: number;
}

const CustomPagination = (props: ICustomPagination) => {
  const updateSearchParam = useUpdateSearchParam();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  return (
    <Stack
      direction={{ md: "row", xs: "column-reverse" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      my={2}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Select
          size="small"
          value={limit}
          onChange={(e: any) =>
            updateSearchParam({ key: "limit", value: e.target.value })
          }
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="25">25</MenuItem>
        </Select>
        <Typography variant="caption">
          Displaying {Number(page) * Number(limit) - (Number(limit) - 1)} -{" "}
          {Number(page) * Number(limit)} of {props.total} records
        </Typography>
      </Stack>
      <Pagination
        color="primary"
        page={Number(page)}
        count={Math.ceil(Number(props.total) / Number(limit))}
        onChange={(_e, value) =>
          updateSearchParam({ key: "page", value: String(value) })
        }
      />
    </Stack>
  );
};

export default CustomPagination;
