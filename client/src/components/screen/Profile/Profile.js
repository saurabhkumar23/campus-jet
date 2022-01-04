import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import M from "materialize-css";
import { useParams, Link, useHistory } from "react-router-dom";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const { userId } = useParams();
  console.log(userId);
  //usestates
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/isAdmin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAdmin(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
    // admin login then user not allowed
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/user/userid/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.error) {
          M.toast({ html: result?.error, classes: "#c62828 red darken-3" });
          history.push("/users");
        } else {
          setUser(result);
          setIsUserAdmin(result?.admin);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);

  const userDeleteHandler = () => {
    setLoading(true);
    fetch(`/user/${user?.id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          history.push("/users");
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  };

  const makeAdminHandler = () => {
    setLoading(true);
    fetch(`/user/makeAdmin/${user?.id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          setIsUserAdmin(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }

  const removeAdminHandler = () => {
    setLoading(true);
    fetch(`/user/removeAdmin/${user?.id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#c62828 red darken-3" });
          setIsUserAdmin(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }

  return (
    <>
      {loading || !user ? (
        <Loading />
      ) : (
        <section className="profile">
          <div className="container">
            <div class="row">
              <div class="col l12 m6">
                <div class="card">
                  <div class="card-content">
                    <div className="head">
                      <span class="card-title">
                        {user?.firstName.toUpperCase()}'S PROFILE
                      </span>
                      {isAdmin ? (
                        <div className="delete-div" onClick={userDeleteHandler}>
                          <i class="medium material-icons">delete</i>
                        </div>
                      ) : null}
                    </div>

                    <table>
                      <tbody>
                        <tr>
                          <td className="heading">Username</td>
                          <td className="data">{user?.username}</td>
                        </tr>
                        <tr>
                          <td className="heading">Name</td>
                          <td className="data">
                            {user?.firstName + " " + user.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td className="heading">Phone</td>
                          <td className="data">{user?.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="makeAdminButtonContainer">
                        {
                            !isUserAdmin ? 
                            <button
                            onClick={makeAdminHandler}
                            className=" apply-link btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
                            >
                            Add As Admin
                            </button>
                            :
                            <button
                            onClick={removeAdminHandler}
                            className="apply-link btn btn-large waves-effect waves-light #d50000 red accent-4"
                            >
                            Remove As Admin
                            </button>
                        }
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
