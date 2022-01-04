import React,{useContext,useEffect, useRef, useState} from 'react'
import {UserContext} from '../../../App'
import Loading from "../Loading";
import M from 'materialize-css'
import { useParams, Link, useHistory } from "react-router-dom";

const UserSearch = () => {

    const {state,dispatch} = useContext(UserContext)
    const searchModal = useRef(null)
  const history = useHistory();

    //usestates
    const[search,setSearch] = useState('')
    const [searchUsers,setSearchUsers] = useState([])
    const [loading, setLoading] = useState(false);

    // initialise search modal
    useEffect(() => {
        const options = {
            onCloseStart: function() {
                // setSearch('')
                // setSearchUsers([])
                // setIsModalClose(true);
            }
        }
        M.Modal.init(searchModal.current,options)
    },[])

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
                setSearchUsers(result);
            }
            setLoading(false);
          })
          .catch((error) => {
            M.toast({ html: error, classes: "#c62828 red darken-3" });
            setLoading(false);
          });
      },[]);
    

    // fetching search users
    const fetchUsers = (data) => {
        setSearch(data)
        if(data && data.length > 0){
            fetch("/user/searchUser/" + data,{
                method : "get",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setSearchUsers(result)
            })
            .catch((error) => console.log(error))
        }
        else{
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
                    setSearchUsers(result);
                }
                setLoading(false);
            })
            .catch((error) => {
                M.toast({ html: error, classes: "#c62828 red darken-3" });
                setLoading(false);
            });
        }
    }

    return (
            <div id="modal1" className="modal modal-fixed-footer" ref={searchModal} style={{color:'black'}}>
                <div className="modal-content">
                    <div className="input-field">
                        <input type="text" placeholder="search user"
                            value={search}
                            onChange={(e) => fetchUsers(e.target.value)}
                        />
                    </div>
                    <ul className="collection">
                        {
                            searchUsers.map(user => 
                                <Link 
                                    to={!state ? "/login" : (user?.id === state?.id ? "/profile" : `/user/${user?.id}` )}
                                    className = "modal-close"
                                    key={user?.id}>
                                    <li  
                                        className="collection-item"
                                        >
                                        {user?.firstName + " " + user?.lastName}
                                        <span className="grey-text text-darken-2" style={{float:'right'}}>{user?.username}</span>
                                    </li>
                                </Link>
                            )
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Close</button>
                </div>
            </div>
    )
}

export default UserSearch
