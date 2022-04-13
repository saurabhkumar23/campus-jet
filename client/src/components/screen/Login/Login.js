import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'
import {UserContext} from '../../../App'
import Loading from '../Loading'

const Login = () => {

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)

    //usestates
    const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPassVisible,setPassVisible] = useState(false)
    const [isOtpNeeded, setIsOtpNeeded] = useState(true);
    const [otp, setOtp] = useState("");

    // redirect to home, if already logged in
    useEffect(() => {
        setIsOtpNeeded(false);
        if(state){
            history.push('/opportunity')
        }
    },[])

    // api call to login authentication
    const submitData = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch("login",{
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"username" : email,password, otp})
        })
        .then((res) => res.json())
        .then((data) => {
            if(data?.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data?.token)
                localStorage.setItem("user",JSON.stringify(data?.user))
                dispatch({type:'USER',payload:data?.user})               
                M.toast({html: `Welcome ${data?.user?.username}`,classes:"#2e7d32 green darken-3"})
                history.push('/opportunity')
            }
            setLoading(false)
        })
        .catch((error) => {
            console.log('dfadsf')
            M.toast({html: error,classes:"#c62828 red darken-3"})
            setLoading(false)
        })
    }

  const checkOtpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/user/mfa/generateotp/" + email, {
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

//   const verifyOtp = () => {
//         if(password1 != password2){
//             M.toast({ html: "Password doesn't match", classes: "#c62828 red darken-3" });
//             return;
//         }
//     setLoading(true);
//     fetch("/login", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         otp
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.error) {
//           M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
//         } else {
//           M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
//           submitData();
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         M.toast({ html: error, classes: "#c62828 red darken-3" });
//         setLoading(false);
//       });
//   }


    return (
        <>
            {
                loading ? <Loading/> :
                <section className='form-main-container'>
                    <section className="login-form">

                    {isOtpNeeded ? (
                    <div className="card">
                    <div className="input-field">
                    <h5>Enter OTP</h5>
                    <input
                      type="number"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <button
                        onClick={submitData}
                      style={{ marginTop: "20px" }}
                      className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      VERIFY
                    </button>
                  </div>
                        </div>
                  
                ) : (
                    <div className="card">
                            <h2>LOGIN</h2>
                            <form onSubmit={(e) => checkOtpHandler(e)}>
                            <div className="input-field">
                                <input type="number" placeholder="Enrollment No."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-field password-field">
                                <input type={isPassVisible ? "text" : "password"} placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setPassVisible(!isPassVisible)}>{isPassVisible ? "Hide" : "Show"}</span>
                            </div>
                            <button  type='submit' className="btn waves-effect waves-light #64b5f6 blue darken-2">Login</button>
                            </form>
                            <hr style={{marginTop:'20px', width:'50%'}}/>
                            <Link to='/resetPass' className='blue-text text-darken-4'>Forgot Password?</Link>
                            <h6>Don't have an account? <Link className="blue-text lighten-2" to="/signup">Sign up</Link></h6>
                        </div>
                )}


                        
                    </section>
                </section>
            }
        </>
    );
}

export default Login







