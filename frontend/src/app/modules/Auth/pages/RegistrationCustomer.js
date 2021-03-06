import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register_customer } from "../_redux/authCrud";
import Select from 'react-select';
import DatePicker from 'react-datepicker';

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  changepassword: "",
  phoneNumber: "",
  dateBirth:"",
  gender: "",
  customer: true,
  admin: false,
};

function RegistrationCustomer(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
      lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
      phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid'),

      email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
      password: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      register_customer(values.firstName, values.lastName, values.email, 
        values.password, values.phoneNumber, dateBirth, gender.value,
        values.customer, values.admin)
        .then(({ data: { accessToken } }) => {
          props.register_customer(accessToken);
          disableLoading();
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
          disableLoading();
        });
    },
  });

  const [dateBirth, setDateBirth] = useState(null);
  const [gender, setSelectedOption] = useState(null);

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: FirstName */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="First name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "firstName"
            )}`}
            name="firstName"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.firstName}</div>
            </div>
          ) : null}
        </div>
        {/* end: FirstName */}

        {/* begin: LastName */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Last name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "lastName"
            )}`}
            name="lastName"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.lastName}</div>
            </div>
          ) : null}
        </div>
        {/* end: LastName */}        

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: PhoneNumber */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Phone Number"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "phoneNumber"
            )}`}
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.phoneNumber}</div>
            </div>
          ) : null}
        </div>
        {/* end: PhoneNumber */}

        {/*begin: Date of Birth  */}
        <div className="form-group fv-plugins-icon-container">
          <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={dateBirth}
          onChange={date => setDateBirth(date)}
          placeholderText="Date of birth"
          className={"form-control form-control-solid h-auto py-5 px-6 "}
          name="dateBirth"
           />
        </div>
        {/* end: Date of Birth */}

        {/* begin: Gender */}
        <div className="form-group fv-plugins-icon-container">
          <Select
          value={gender}
          onChange={setSelectedOption}
          options={options}
          className={"form-control form-control-solid h-auto py-5 px-6"}
          name="gender"
          placeholder="Gender"
        />
        </div>
        {/* end: Gender */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}
        <div className="form-group fv-plugins-icon-container"/* className="form-group d-flex flex-wrap flex-center" */>
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.isValid 
            }
            className="btn btn-block btn-primary font-weight-bold h-auto py-5 px-6"
          >
            <span>Sing Up</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
        <div className="form-group fv-plugins-icon-container">
        <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-block btn-light-primary font-weight-bold h-auto py-5 px-6"
            >
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(RegistrationCustomer));
