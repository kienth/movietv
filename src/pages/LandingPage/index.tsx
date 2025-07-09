import { Stack } from "@mui/material";

import { useSetInitialSearchParams } from "../../utils/url";
import { useGeneral } from "../../redux/generalHook";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Card from "./components/Card";
import CustomTable from "../../generalComponent/CustomTable";

const column = [
  { label: "Control Number", align: "center", value: "control_number" },
  { label: "Requesting Office", align: "center", value: "requesting_office" },
  { label: "Status", align: "center", value: "status" },
  { label: "Submitted On", align: "center", value: "r.created_at" },
  { label: "Action", align: "right" },
];

const LandingPage = () => {
  useSetInitialSearchParams({
    page: "1",
    limit: "5",
    order: "request_ID DESC",
  });

  const { data, isSuccess, isLoading, isError } = useGeneral({
    url: `/movietv${location.search}`,
    method: "GET",
    disableFetch: location.search === "",
  });

  return (
    <Stack height="100dvh" spacing={3}>
      <Header />
      <Filter />
      <Card />
      <CustomTable column={column} />
    </Stack>
  );
};

export default LandingPage;
