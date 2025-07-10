import Swal from "sweetalert2";
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
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete, Edit, TheatersRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import { useGeneral } from "../../../redux/generalHook";
import type { ILandingPage } from "../_landingPage";

interface ICustomTable {
  isLoading?: boolean;
  isError?: boolean;
  row?: any[];
  column: any[];
  handleOpen: ({
    id,
    data,
  }: {
    id: null | number;
    data: null | ILandingPage;
  }) => void;
  deleteTableRow: (id: number) => void;
}

const CustomTable = (props: ICustomTable) => {
  const { generalAction } = useGeneral({});

  return (
    <Box>
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
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {Number(props.row?.length) > 0 ? (
                props.row?.map((column, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack>
                        <Typography
                          noWrap
                          variant="subtitle1"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {column.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {column.summary}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Chip
                        label={column.type}
                        color="primary"
                        variant={
                          column.type === "TV_Show" ? "outlined" : "filled"
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.director}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        $
                        {new Intl.NumberFormat("en-US").format(
                          Number(column.budget)
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.location}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.duration}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="body2">{column.year}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography variant="body2">{column.genre}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <Stack
                        direction="row"
                        divider={
                          <Divider
                            flexItem
                            orientation="vertical"
                            sx={{ mx: 1 }}
                          />
                        }
                      >
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            props.handleOpen({ id: column.id, data: column })
                          }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You want to submit this request?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, submit it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                generalAction({
                                  url: `/movietv/${column.id}`,
                                  method: "DELETE",
                                }).then((e) => {
                                  if (e.data) {
                                    props.deleteTableRow(column.id);
                                  }
                                });
                              }
                            })
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
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
                    <Stack alignItems="center" spacing={1} my={5}>
                      <TheatersRounded color="primary" sx={{ fontSize: 50 }} />
                      <Typography variant="body1">No entries found</Typography>
                      <Typography variant="caption">
                        Try adjusting your search terms
                      </Typography>
                      <Button
                        startIcon={<Add />}
                        variant="contained"
                        size="small"
                        sx={{ width: "fit-content" }}
                        onClick={() =>
                          props.handleOpen({ id: null, data: null })
                        }
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
      </>
    </Box>
  );
};

export default CustomTable;
