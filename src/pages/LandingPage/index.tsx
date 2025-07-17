import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

import {
  useSetInitialSearchParams,
  useUpdateSearchParam,
} from "../../utils/url";
import { useGeneral } from "../../redux/generalHook";
import Header from "./components/Header";
import Filter from "./components/Filter";
// import Card from "./components/Card";
import CustomTable from "./components/CustomTable";
import Modal from "./components/Modal";
import type { ILandingPage } from "./_landingPage";

const column = [
  { label: "Title" },
  { label: "Type", align: "center" },
  { label: "Director", align: "center" },
  { label: "Budget", align: "right" },
  { label: "Location", align: "center" },
  { label: "Duration", align: "center" },
  { label: "Year", align: "center" },
  { label: "Genre", align: "center" },
  { label: "Action", align: "center" },
];

const LandingPage = () => {
  const updateSearchParam = useUpdateSearchParam();
  useSetInitialSearchParams({
    page: "1",
    limit: "10",
  });

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // for Modal
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    id: null | number;
    data: ILandingPage | null;
  }>({ isOpen: false, id: null, data: null });

  // for Table
  const [tableData, setTableData] = useState<ILandingPage[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: res,
    isSuccess,
    isError,
  } = useGeneral({
    url: `/${location.search}`,
    method: "GET",
    disableFetch: location.search === "",
  });

  const handleOpen = ({
    id,
    data,
  }: {
    id: null | number;
    data: null | ILandingPage;
  }) => {
    setModalData({ isOpen: true, id, data });
  };

  const updateTableRow = (updatedItem: { id: number; [key: string]: any }) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteTableRow = (id: number) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 1 && hasMore) {
      updateSearchParam({ key: "page", value: String(page + 1) });
    }
  };

  useEffect(() => {
    if (isSuccess && res.data.length > 0) {
      setTableData((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = res.data.filter(
          (item: { id: number }) => !existingIds.has(item.id)
        );
        return [...prev, ...newItems];
      });

      if (page >= res.meta.totalPages) {
        setHasMore(false);
      }
    }
  }, [isSuccess, res, location]);

  return (
    <div
      onScroll={handleScroll}
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "95dvh",
        paddingRight: 10,
      }}
    >
      <Stack spacing={3}>
        <Header />
        <Filter handleOpen={handleOpen} />
        {/* <Card /> */}
        <Box>
          <CustomTable
            isError={isError}
            row={tableData}
            column={column}
            handleOpen={handleOpen}
            deleteTableRow={deleteTableRow}
          />
          {!hasMore && (
            <Divider sx={{ my: 5 }}>
              <Typography variant="subtitle2" color="grey">
                No more data
              </Typography>
            </Divider>
          )}
        </Box>
      </Stack>
      <Modal
        id={modalData.id}
        data={modalData.data}
        open={modalData.isOpen}
        handleClose={() =>
          setModalData({ isOpen: false, id: null, data: null })
        }
        updateTableRow={(data) => updateTableRow(data)}
      />
    </div>
  );
};

export default LandingPage;
