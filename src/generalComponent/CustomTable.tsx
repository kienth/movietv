import { useSearchParams } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import {
  Add,
  ArrowDropDown,
  ArrowDropUp,
  TheatersRounded,
} from "@mui/icons-material";

import CustomLoading from "./CustomLoading";
import CustomSkeleton from "./CustomSkeleton";
import Error from "./display/Error";
import { useUpdateSearchParam } from "../utils/url";
import CustomPagination from "./CustomPagination";
import { grey } from "@mui/material/colors";

interface ICustomTable {
  total?: number;
  isLoading?: boolean;
  isError?: boolean;
  row?: any[];
  column: any[];
}

const CustomTable = (props: ICustomTable) => {
  const updateSearchParam = useUpdateSearchParam();

  const [searchParams] = useSearchParams();
  const order = searchParams.get("order") || "request_ID+DESC";

  return (
    <Box>
      {props.isLoading ? (
        <CustomSkeleton height="70vh" />
      ) : (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 2, border: "1px solid lightgrey" }}
          >
            <Table sx={{ width: 1 }}>
              {Number(props.row?.length) > 0 && (
                <TableHead sx={{ bgcolor: grey[100] }}>
                  <TableRow>
                    {props.column.map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          align={item.align || "left"}
                          sx={{
                            cursor: item.value ? "pointer" : "",
                          }}
                          onClick={() => {
                            item.value &&
                              updateSearchParam({
                                key: "order",
                                value: `${item.value} ${
                                  order.split(" ")[0] === item.value
                                    ? order.split(" ")[1] === "ASC"
                                      ? "DESC"
                                      : "ASC"
                                    : "DESC"
                                }`,
                              });
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={
                              item.align === "left"
                                ? "start"
                                : item.align === "center"
                                ? "center"
                                : item.align === "right"
                                ? "end"
                                : "start"
                            }
                            spacing={0.5}
                          >
                            <Typography variant="body1" fontWeight={600} noWrap>
                              {item.label}
                            </Typography>
                            {item.value === order.split(" ")[0] ? (
                              order.split(" ")[1] === "ASC" ? (
                                <ArrowDropDown sx={{ color: "#FFF" }} />
                              ) : (
                                <ArrowDropUp sx={{ color: "#FFF" }} />
                              )
                            ) : null}
                          </Stack>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {props.isLoading || props.isError ? (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {props.isLoading ? <CustomLoading /> : <Error />}
                    </TableCell>
                  </TableRow>
                ) : Number(props.row?.length) > 0 ? (
                  props.row?.map((column, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      {column.map((row: any, index: number) => (
                        <TableCell
                          key={index}
                          component="th"
                          scope="row"
                          align={props.column[index].align || "left"}
                        >
                          {typeof row === "string" ? (
                            <Typography variant="body2" noWrap>
                              {row}
                            </Typography>
                          ) : (
                            row
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={props.column.length}
                      sx={{
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      <Stack alignItems="center" spacing={1}>
                        <TheatersRounded sx={{ fontSize: 50 }} />
                        <Typography variant="body1">
                          No entries found
                        </Typography>
                        <Typography variant="caption">
                          Try adjusting your search terms
                        </Typography>
                        <Button
                          startIcon={<Add />}
                          variant="contained"
                          size="small"
                          sx={{ width: "fit-content" }}
                        >
                          Add New Entry
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomPagination total={props.total} />
        </>
      )}
    </Box>
  );
};

export default CustomTable;
