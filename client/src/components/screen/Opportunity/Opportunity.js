import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Loading from "../Loading";
import {useParams,Link,useHistory} from 'react-router-dom'
import M from "materialize-css";

const Opportunity = () => {
  
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext);
  const {opportunityId} = useParams()

  //usestates
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOtpNeeded, setIsOtpNeeded] = useState(false);
  const [otp, setOtp] = useState("");
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

useEffect(() => {
    if(state){
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
              setUser(result)
            }
            setLoading(false);
          })
          .catch((error) => {
            M.toast({ html: error, classes: "#c62828 red darken-3" });
            setLoading(false);
          });
    }
    
  }, []);

  useEffect(() => {
      if(state){
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
      }
    
    // admin login then user not allowed
},[])

  // api call to fetch my post
  useEffect(() => {
      if(state){
        setLoading(true)
        fetch(`/opportunity/${opportunityId}`,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => res.json())
        .then((result) => {
            if(result?.error){
                M.toast({html: result?.error,classes:"#c62828 red darken-3"})
                history.push('/opportunity')
            }
            else{
                if(result?.createdDate){
                console.log(result);
                    let date = result.createdDate.split(' ')[0];
                console.log(date);
    
                    let dateArr = date.split('/');
                console.log(dateArr);
    
                result.createdDate = dateArr[0] + ', ' + month[dateArr[1]] + ' ' + dateArr[2];
                }
                setData(result);
            }
            setLoading(false)
        })
        .catch((error) => {
            M.toast({html: error,classes:"#c62828 red darken-3"})
            setLoading(false)
        })
      }
   
},[])

const verifyOtp = () => {
    setLoading(true);
    fetch("/user/apply", {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userId" : user?.username,
         opportunityId,
         "referenceNo" : otp
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
          isOtpNeeded(false);
          setOtp("")
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          isOtpNeeded(false);
          setOtp("")
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
      {loading || !data ? (
        <Loading />
      ) : (
        <section className="opportunity-container">
          <div>
            <div class="row">
              <div class="col l12 m6">
                <div class="card">
                  <div class="card-content">
                    <div className="back-container">
                        <Link to={`/opportunity`}>
                            <i class="material-icons">keyboard_backspace</i>
                            <div>All Opportunities</div>
                        </Link>
                        </div>
                    <div className="head">
                        <span class="card-title">{data.jobTitle}</span>
                        <div>
                            {
                                isAdmin ? <Link className="edit-link" to={ `/admin/editOpportunity/${data.id}`}> 
                                            <i class="material-icons">edit</i>
                                        </Link> 
                                : null
                            }
                        </div>
                    </div>
                    <p className="date">{data.createdDate}</p>
                    <p className="desc">{data.description}</p>
                    <table>

        <tbody>
          <tr>
            <td className="heading">Job Title</td>
            <td className="data">{data.jobTitle}</td>
          </tr>
          <tr>
          <td className="heading">Eligibility</td>
          <td className="data">{data.eligibility}</td>

          </tr>
          <tr>
          <td className="heading">Min. CGPA Required</td>
          <td className="data">{data.minCgpa}</td>

          </tr>
          <tr>
              <td className="heading">CTC</td>
              <td className="data">{data.ctc}</td>
          </tr>
          <tr>
              <td className="heading">Joining</td>
              <td className="data">{data.joining}</td>
          </tr>
          <tr>
              <td className="heading">Profile</td>
              <td className="data">{data.profile}</td>
          </tr>
          <tr>
              <td className="heading">Bond</td>
              <td className="data">{data.bond}</td>
          </tr>
          <tr>
              <td className="heading">Last Date To apply</td>
              <td className="data">{data.lastDate}</td>
          </tr>
          <tr>
          <td className="heading">Work Location</td>
          <td className="data">{data.location}</td>
          </tr>
          <tr>
          <td className="heading">Employment Type</td>
            <td className="data">{data.employementType}</td>
          </tr>
        </tbody>
      </table>
      <div onClick={() => setIsOtpNeeded(true)}>
        <a class="apply-link btn waves-effect waves-light" target='_blank' href={data.applyLink}>Apply Now</a>
      </div>
      {
          isOtpNeeded ? <div className="input-field" style={{'textAlign' : 'center', 'marginTop' : '15px'}}>
                    <input
                      type="text"
                      placeholder="Enter your Reference No."
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <button
                      onClick={verifyOtp}
                      style={{ marginTop: "20px" }}
                      className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      SUBMIT
                    </button>
                  </div> : null
      }
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

export default Opportunity;


