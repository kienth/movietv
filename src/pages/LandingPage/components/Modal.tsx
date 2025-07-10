import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useGeneral } from "../../../redux/generalHook";
import type { ILandingPage } from "../_landingPage";
import { useEffect } from "react";

interface IModal {
  id: number | null;
  data: ILandingPage | null;
  open: boolean;
  handleClose: () => void;
  updateTableRow: (updatedItem: { id: number; [key: string]: any }) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  type: yup.string().required("Type is required"),
  director: yup.string().required("Director is required"),
  budget: yup
    .number()
    .typeError("Budget must be a number")
    .positive("Budget must be positive")
    .required("Budget is required"),
  location: yup.string().required("Location is required"),
  duration: yup.string().required("Duration is required"),
  year: yup
    .number()
    .typeError("Year must be a number")
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear(), "Year can't be in the future")
    .required("Year is required"),
  genre: yup.string(),
  summary: yup.string(),
});

const initialValues = {
  title: "",
  type: "",
  director: "",
  budget: null,
  location: "",
  duration: "",
  year: null,
  genre: "",
  summary: "",
};

const Modal = (props: IModal) => {
  const { generalAction, actionIsSuccess } = useGeneral({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.data !== null ? props.data : initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      generalAction({
        url: `/movietv${props.id !== null ? `/${props.id}` : ""}`,
        method: props.id !== null ? "PUT" : "POST",
        body: values,
      });
    },
  });

  const getRequiredFields = (schema: yup.AnyObjectSchema): string[] => {
    const fields: string[] = [];

    for (const [key, value] of Object.entries(schema.fields)) {
      if (
        (value as any).tests.some((t: any) => t.OPTIONS?.name === "required")
      ) {
        fields.push(key);
      }
    }
    return fields;
  };

  const requiredFields = getRequiredFields(schema);

  useEffect(() => {
    if (actionIsSuccess) {
      if (props.id !== null) {
        props.updateTableRow({ id: props.id, ...formik.values });
      }
      props.handleClose();
    }
  }, [actionIsSuccess]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        {props.id !== null ? "Update Existing Data" : "Add New Entry"}
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {(Object.keys(initialValues) as (keyof typeof initialValues)[]).map(
              (item) => {
                return (
                  <Grid
                    size={{ md: item === "summary" ? 12 : 6, xs: 12 }}
                    key={item}
                  >
                    {item === "type" ? (
                      <FormControl fullWidth>
                        <InputLabel>
                          {`${item.charAt(0).toUpperCase() + item.slice(1)}${
                            [...requiredFields, "year", "budget"].includes(item)
                              ? " *"
                              : ""
                          }`}
                        </InputLabel>
                        <Select
                          fullWidth
                          label={`${
                            item.charAt(0).toUpperCase() + item.slice(1)
                          }${
                            [...requiredFields, "year", "budget"].includes(item)
                              ? " *"
                              : ""
                          }`}
                          name={item}
                          value={formik.values[item]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched[item] && Boolean(formik.errors[item])
                          }
                        >
                          <MenuItem value="Movie">Movie</MenuItem>
                          <MenuItem value="TV_Show">TV_Show</MenuItem>
                        </Select>
                        {formik.touched[item] &&
                          Boolean(formik.errors[item]) && (
                            <FormHelperText>
                              {String(formik.errors[item])}
                            </FormHelperText>
                          )}
                      </FormControl>
                    ) : (
                      <TextField
                        type={
                          ["budget", "year"].includes(item) ? "number" : "text"
                        }
                        multiline={item === "summary"}
                        rows={item === "summary" ? 5 : 0}
                        fullWidth
                        label={`${
                          item.charAt(0).toUpperCase() + item.slice(1)
                        }${
                          [...requiredFields, "year", "budget"].includes(item)
                            ? " *"
                            : ""
                        }`}
                        name={item}
                        value={formik.values[item]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[item] && Boolean(formik.errors[item])
                        }
                        helperText={
                          formik.touched[item] && Boolean(formik.errors[item])
                            ? String(formik.errors[item])
                            : ""
                        }
                      />
                    )}
                  </Grid>
                );
              }
            )}
          </Grid>
          <DialogActions>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
