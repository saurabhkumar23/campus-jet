import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../../App";
import Loading from "../Loading";

const Signup = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setPassVisible] = useState(false);
  const [isOtpNeeded, setIsOtpNeeded] = useState(false);
  const [otp, setOtp] = useState("");

  // redirect to home, if already logged in
  useEffect(() => {
    if (state) {
      history.push("/opportunity");
    }
  }, []);

  // function for creating a new user
  const checkOtpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/user/generateotp/" + username, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     username,
      //   }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
          console.log(data.error);
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          setIsOtpNeeded(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  };

  const verifyOtp = () => {
    setLoading(true);
    fetch("/user/verifyotp/" + username, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          submitData();
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }

  const submitData = () => {
    setLoading(true);
    fetch("user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        phone,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          history.push("/login");
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="form-main-container">
          <section className="signup-form">
            <div className="card">
              <h2>REGISTRATION</h2>
              <form onSubmit={(e) => checkOtpHandler(e)}>
                {isOtpNeeded ? (
                  <div className="input-field">
                    <input
                      type="number"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <button
                      onClick={verifyOtp}
                      style={{ marginTop: "20px" }}
                      className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      VERIFY
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="input-field">
                      <input
                        type="number"
                        placeholder="Enrollment No."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        pattern="[789][0-9]{9}"
                      />
                    </div>
                    <div className="input-field password-field">
                      <input
                        type={isPassVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span onClick={() => setPassVisible(!isPassVisible)}>
                        {isPassVisible ? "Hide" : "Show"}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      Register
                    </button>
                    <h6>
                      Have an account?{" "}
                      <Link className="blue-text lighten-2" to="/login">
                        Log in
                      </Link>
                    </h6>
                  </div>
                )}
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Signup;
