import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import M from "materialize-css";
import Pagination from "../Pagination";

const Home = () => {
  const history = useHistory();
  const { state } = useContext(UserContext);

  //usestates
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [month, setMonth] = useState({
    '01' : 'January',
    '02' : 'February',
    '03' : 'March',
    '04' : 'April',
    '05' : 'May',
    '06' : 'June',
    '07' : 'July',
    '08' : 'August',
    '09' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December',
  })


  //pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  // api call to fetch all posts
  useEffect(() => {
    setLoading(true);
    fetch("/opportunity/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
          history.push("/login");
        } else {
            for(let idx in data){
                console.log(data[idx]);
                if(data[idx]?.createdDate){
                console.log(data[idx]);
                    let date = data[idx].createdDate.split(' ')[0];
                console.log(date);

                    let dateArr = date.split('/');
                console.log(dateArr);

                    data[idx].createdDate = dateArr[0] + ', ' + month[dateArr[1]] + ' ' + dateArr[2];
                }
            }
          setData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    fetch('/isAdmin',{
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data){
            setIsAdmin(true);
        }
        setLoading(false)
    })
    .catch((error) => {
        M.toast({html: error,classes:"#c62828 red darken-3"})
        setLoading(false)
    })
    // admin login then user not allowed
},[])

  //function for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // api call to update likes on a post
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      });
  };

  // api call to update likes on a post
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      });
  };

  // api call to add comment on a post
  const commentPost = (e, postId) => {
    e.preventDefault();
    if (!e.target[0].value.trim()) {
      return;
    }
    const text = e.target[0].value;
    e.target[0].value = "";
    fetch("/comment", {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      });
  };

  // api call to delete a post
  const deletePost = (id) => {
    fetch(`/deletePost/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  //api call to delete a comment
  const deleteComment = (commentId, commentText, commentPostedBy, postId) => {
    fetch(`/deleteComment`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, commentText, commentPostedBy, postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      });
  };

  return (
    <div>
      {loading || !data ? (
        <Loading />
      ) : (
        <di className="drives">
          <div className="container">
            <div className="heading">CAMPUS DRIVES</div>
          </div>
          {data.map((row) => {
            return (
              <div className="drives-container">
                <div className="container">
                  <div class="row">
                    <div class="col l12 m6">
                      <Link to={`/opportunity/${row.id}`}>
                        <div class="card">
                          <div>
                            {isAdmin ? (
                              <Link
                                to={`/admin/opportunity/${row?.id}/details`}
                              >
                                <i class="small material-icons">info</i>
                              </Link>
                            ) : null}
                          </div>
                          <div class="card-content">
                            <span class="card-title">{row.jobTitle}</span>
                            <p className="date">
                              Posted on {row.createdDate}
                            </p>
                            <p className="data">{row.description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </di>
      )}
    </div>
  );
};

export default Home;
