import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import { useParams, Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Users from "../Users/Users";

function OpportunityDetail() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [users, setUsers] = useState(null);

  const { opportunityId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/opportunity/${opportunityId}/users`, {
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
          setUsers(result);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);

  const exportHandler = () => {
    setLoading(true);
    fetch("/excel/user", {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
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
      {loading || !users ? (
        <Loading />
      ) : (
        <section className="profile oppor-details">
          <div className="container">
            <div class="row">
            <div className="export-container" style={{'textAlign' : 'right'}}>
            <button
               onClick={exportHandler}
                style={{ marginTop: "20px" }}
                className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
              >
                EXPORT
              </button>
            </div>

              <div class="col l12 m6">
                {users.map((user) => {
                  return (
                    <div class="card">
                      <div class="card-content">
                        <table>
                          <tbody>
                            <tr>
                              <td className="heading">Username</td>
                              <td className="data">{user?.username}</td>
                            </tr>
                            <tr>
                              <td className="heading">Name</td>
                              <td className="data">
                                {user?.firstName + " " + user?.lastName}
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
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default OpportunityDetail;
