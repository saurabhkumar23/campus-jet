import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import M from "materialize-css";
import { useParams, Link, useHistory } from "react-router-dom";

const Users = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  //usestates
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch('/isAdmin',{
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(!data){
            history.push('/opportunity');
        }
        setLoading(false)
    })
    .catch((error) => {
        M.toast({html: error,classes:"#c62828 red darken-3"})
        setLoading(false)
    })
    // admin login then user not allowed
},[])

  // api call to fetch my post
  useEffect(() => {
    setLoading(true);
    fetch("/user/all", {
        method: "GET",
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

  return (
    <>
      {loading || !users ? (
        <Loading />
      ) : (
        <section className="users-section">
          <div className="container">
                 {
                      users.map((row) => {
                          return (
                            <div className="user-container">
                                <div className="">
                                    <div class="row">
                                        <div class="col l12 m6">
                                            <Link to={`/user/${row?.id}`}>
                                                <div class="card">
                                                    <div class="card-content">
                                                        <span class="card-title">{row?.username}</span>
                                                        <p class="">{row?.firstName + " " + row?.lastName}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          )
                      })
                  }
          </div>
        </section>
      )}
    </>
  );
};

export default Users;
