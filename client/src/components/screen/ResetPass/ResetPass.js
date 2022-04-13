import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';
import M from 'materialize-css'
import Loading from "../Loading";

const ResetPass = () => {

    const history = useHistory()
    const [username, setUsername] = useState("");
    const [loading,setLoading] = useState(false);
    const [isOtpNeeded, setIsOtpNeeded] = useState(false);
    const [otp, setOtp] = useState("");
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [isPassVisible1,setPassVisible1] = useState(false)
    const [isPassVisible2,setPassVisible2] = useState(false)
    


    // api call to reset the password
    // const submitData = () => {
    //     fetch("/resetPassword",{
    //         method : "post",
    //         headers : {
    //             "Content-Type" : "application/json"
    //         },
    //         body : JSON.stringify({username})
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         if(data.error){
    //             M.toast({html: data.error,classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html: data.message,classes:"#2e7d32 green darken-3"})
    //             history.push('/login')
    //         }
    //     })
    //     .catch((error) => console.log(error))
    // }

    // function for reset password
  const checkOtpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/user/forgotPass/" + username, {
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
        if(password1 != password2){
            M.toast({ html: "Password doesn't match", classes: "#c62828 red darken-3" });
            return;
        }
    setLoading(true);
    fetch("/user/resetPass/" + username, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        'password' : password1
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
        //   submitData();
          history.push('/login')

        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }

//   const submitData = () => {
//     setLoading(true);
//     fetch("user/signup", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         firstName,
//         lastName,
//         phone,
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.error) {
//           M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
//         } else {
//           M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
//           history.push("/login");
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         M.toast({ html: error, classes: "#c62828 red darken-3" });
//         setLoading(false);
//       });
//   };

    return (
        <>
 {
            loading ? <Loading/> :
                <section className='form-main-container'>
                    {/* <section className='logo'>
                        <img src='https://res.cloudinary.com/getgrouped/image/upload/v1609421382/White_and_Pink_Strikeout_Cosmetics_Beauty_Logo_ymim3g.png'
                            alt='main-logo'
                        />
                    </section> */}
                    <section className="reset-password-form">
                        <div className="card">
                            {/* <div className="input-field">
                                <input type="text" placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div> */}
                            {/* <button onClick={submitData} className="btn waves-effect waves-light #64b5f6 blue darken-2">Submit</button> */}
                {isOtpNeeded ? (
                  <div className="input-field">
                    <h2>Forgot Password</h2>
                    <input
                      type="number"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />

                    <div className="input-field password-field">
                                <input type={isPassVisible1 ? "text" : "password"} placeholder="New Password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required
                                />
                                <span
                                onClick={() => setPassVisible1(!isPassVisible1)}>{isPassVisible1 ? "Hide" : "Show"}</span>
                            </div>

                    

                            <div className="input-field password-field">
                                <input type={isPassVisible2 ? "text" : "password"} placeholder="Confirm Password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                />
                                <span 
                                onClick={() => setPassVisible2(!isPassVisible2)}>{isPassVisible2 ? "Hide" : "Show"}</span>
                            </div>
                    <button
                    onClick={verifyOtp}
                      style={{ marginTop: "20px" }}
                      className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      VERIFY
                    </button>
                  </div>
                ) : (
                    <form 
                    onSubmit={(e) => checkOtpHandler(e)}
                    >
                  <div>
                    <div className="input-field">
                    <h2>Campus Jet</h2>
                        <h6>Enter Your Username to reset Password</h6>
                      <input
                        type="number"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn waves-effect waves-light #64b5f6 blue darken-2"
                    >
                      Submit
                    </button>
                  </div>
                  </form>
                )}
                        </div>
                    </section>
                </section>
        }
        </>
       
    );
}

export default ResetPass







