import {
  Box,
  Button,
  Select,
  TextField,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { type } from "@testing-library/user-event/dist/type";
import MiniAdvisors from "../../Advisors/miniAdvisors";

const genders = ["Male", "Female", "Other"];

const AdvisorForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Box m="25px" backgroundColor="white">
      <Header title="Add Advisor" subtitle="Create a New Advisor Profile" />
      <Box display="flex" justifyContent={"space-between"}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                gap="15px"
                width="300px"
                marginTop="150px"
              >
                <TextField
                  type="text"
                  label="Designation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.regNo}
                  name="designation"
                  error={!!touched.regNo && !!errors.regNo}
                  helperText={touched.regNo && errors.regNo}
                />
                <TextField
                  type="text"
                  label="Salary"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="salary"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
                
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#000000",
                    fontWeight: "bold",
                    color: "white",
                    width: "300px",
                    height: "45px",
                    borderRadius: "10px",
                    mt: "20px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Add Advisor
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <MiniAdvisors />
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const regNumRegExp = /^20[0-9]{2}-CS-[0-9]{3}$/;

const checkoutSchema = yup.object().shape({
  regNo: yup
    .string()
    .matches(regNumRegExp, "Registration Number Format is not valid")
    .required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  gender: yup.string().required("required"),
  birthDate: yup.string().required("required"),
});
const initialValues = {
  regNo: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  gender: "",
  birthDate: "",
};

export default AdvisorForm;
