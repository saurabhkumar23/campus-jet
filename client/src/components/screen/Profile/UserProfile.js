import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import M from "materialize-css";
import { useParams, Link, useHistory } from "react-router-dom";

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  //usestates
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // api call to fetch my post
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
          history.push("/");
        } else {
          setUser(result)
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);

  const userDeleteHandler = () => {
      return 1;
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
                        <span class="card-title">{user?.firstName.toUpperCase()}'S PROFILE</span>
                                <a className="edit-link" href={ `/profile/edit/${user.id}`}> 
                                    <i class="medium material-icons">edit</i>
                                </a>
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

export default UserProfile;
