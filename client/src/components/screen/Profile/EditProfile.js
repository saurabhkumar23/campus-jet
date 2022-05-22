import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../../App";
import Loading from "../Loading";

const EditProfile = () => {
  const { userId } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [noOfBacklog, setNoOfBacklog] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.error) {
          M.toast({ html: result?.error, classes: "#c62828 red darken-3" });
          history.push("/opportunity");
        } else {
          setUsername(result?.username);
          setFirstName(result?.firstName);
          setLastName(result?.lastName);
          setPhone(result?.phone);
          setEmail(result?.email);
          setData(result);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);
  // api call to login authentication
  const submitData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`/user/edit/${userId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id: userId,
        username,
        firstName,
        lastName,
        phone,
        email,
        noOfBacklog,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          history.push("/profile");
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
      {loading || !data ? (
        <Loading />
      ) : (
        <section className="form-main-container">
          <section className="login-form">
            <div className="card">
              <h2>EDIT PROFILE FORM</h2>
              <form onSubmit={(e) => submitData(e)}>
                <div className="input-field">
                  <input
                    type="text"
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
                  />
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="No. of backlogs"
                    value={noOfBacklog}
                    onChange={(e) => setNoOfBacklog(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn waves-effect waves-light #64b5f6 blue darken-2"
                >
                  EDIT
                </button>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default EditProfile;
