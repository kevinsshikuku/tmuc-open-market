import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";
import { SET_AUTH_USER } from "../../store/auth";
import { useStore } from "../../store";
import { SIGN_UP } from "../../graphql/user";
import Logo from "../../Assets/icon.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { UsedocumentTitle } from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import ReactGA from "react-ga";
import "./Auth.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  signInContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(8, 0, 3, 0),
    width: "100vw",
  },
  signInLogo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontWeight: "bolder",
    fontSize: "xx-large",
    cursor: "pointer",
    justifyContent: "center",
  },
  signInForm: {
    width: "80vw",
  },
  signInInput: {
    display: "block",
    border: "none",
    borderBottom: " 2px solid rgba(38, 38, 230, 0.857)",
    marginTop: "2rem",
    padding: "6px 0 0 0",
    outline: "none",
    fontSize: "large",
    height: "2em",
    width: "100%",
    color: "black",
    backgroundColor: "none",
  },
  aboutUs: {
    color: "blue",
    padding: theme.spacing(0, 0.5),
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  signInButton: {
    border: "none",
    backgroundColor: "rgb(155, 69, 69)",
    padding: "10px",
    width: "7rem",
    outline: "none",
    borderRadius: "18px",
    boxShadow: "none",
    cursor: "pointer",
    margin: " 2rem 0  2rem 30% ",
  },
}));

/** Lets new user  in*/
function SignUp() {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [, dispatch] = useStore();
  const [values, setValues] = useState({
    username: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });
  UsedocumentTitle("SignUp");
  const { toAppInfo } = Routes();

  /** change hundler... */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatchAction = (token) => {
    dispatch({
      type: SET_AUTH_USER,
      payload: token,
    });
  };

  /** useMutation hook */
  let [signUpUser, { loading }] = useMutation(SIGN_UP, {
    update(_, result) {
      const token = result.data.signup.token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem("jwt", token);
      dispatchAction(decodedToken);
      window.location.href = "/";
    },
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors);
    },
  });

  /**Handle form submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    ReactGA.event({
      category: "Form",
      action: "signin",
      transport: "beacon",
      label: "Repeat user",
    });
    signUpUser();
    setErrors("");
  };

  /**api errors */
  const renderErrors = (apiError) => {
    let errorMessage;
    if (errors) {
      errorMessage = errors[0].message;
    } else if (apiError) {
      errorMessage = apiError.message;
    }
    if (errorMessage) {
      return <i>{errorMessage}</i>;
    }
    return null;
  };

  let loader;
  if (loading) {
    return (
      <div>
        <Header />
        <div className="loader">
          <CircularProgress />
          <p>creating your account ...</p>
          <Footer />
        </div>
      </div>
    );
  }

  const main = (
    <div className="signInContainer">
      <div>
        <div onClick={toAppInfo} className={classes.signInLogo}>
          <span>
            {" "}
            <Avatar alt="logo" src={Logo} className={classes.large} />{" "}
          </span>
          <p>SHOPINN</p>
        </div>

        <form onSubmit={handleSubmit} className={classes.signInForm}>
          {errors.length > 0 && <p className="error">{renderErrors(errors)}</p>}
          <>
            <input
              placeholder="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              className={classes.signInInput}
            />
            <input
              placeholder="phone"
              name="phonenumber"
              type="text"
              value={values.phonenumber}
              onChange={handleChange}
              className={classes.signInInput}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={classes.signInInput}
            />
            <input
              placeholder="confirm password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className={classes.signInInput}
            />{" "}
            <br /> <br />
            <p style={{ textAlign: "center" }}>
              <a href="/aboutus">
                {" "}
                Buy signup you agree with our terms of usage and policy{" "}
              </a>
            </p>
            <button type="submit" className={classes.signInButton}>
              {" "}
              Login{" "}
            </button>
          </>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {loading ? loader : main}
      <Footer />
    </>
  );
}

export default SignUp;
