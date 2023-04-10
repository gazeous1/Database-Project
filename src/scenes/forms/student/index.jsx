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
import MiniStudents from "../../students/mini";

const genders = ["Male", "Female", "Other"];

const StudentForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Box m="25px" backgroundColor="white">
      <Header title="Add Student" subtitle="Create a New Student Profile" />
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
                marginTop="10px"
              >
                <TextField
                  type="text"
                  label="Registration Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.regNo}
                  name="regNo"
                  error={!!touched.regNo && !!errors.regNo}
                  helperText={touched.regNo && errors.regNo}
                />
                <TextField
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                />
                <Select
                  label="Gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  type="date"
                  label=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.birthDate}
                  name="birthDate"
                  error={!!touched.birthDate && !!errors.birthDate}
                  helperText={touched.birthDate && errors.birthDate}
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
                  Add Student
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <MiniStudents />
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

export default StudentForm;
