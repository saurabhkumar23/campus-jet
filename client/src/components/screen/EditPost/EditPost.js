import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom';
import Loading from '../Loading'
import M from 'materialize-css'

const EditPost = () => {

    const history = useHistory()
    const {opportunityId} = useParams()

    //usestates
    const [loading,setLoading] = useState(false)
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [applyLink, setApplyLink] = useState("")
    const [ctc, setCtc] = useState("")
    const [description, setDescription] = useState("")
    const [eligibility, setEligibility] = useState("")
    const [employementType, setEmployementType] = useState("")
    const [location, setLocation] = useState("")
    const [qualification, setQualification] = useState("")


    // api call to fetch current post



    // submit image data to cloudinary and get the url back 
    // const postDetails = () => {
    //     if(!title || !image){                  // all fields must filled...
    //         M.toast({html: 'Please fill all the fields',classes:"#c62828 red darken-3"})
    //         return
    //     }
    //     setLoading(true);
    //     fetch("/editPost",{
    //         method : "put",
    //         headers : {
    //             "Content-Type" : "application/json",
    //             "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
    //         },
    //         body : JSON.stringify({jobTitle, companyName, applyLink, ctc, description, eligibility, employementType, location, qualification})
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         if(data?.error){
    //             M.toast({html: data?.error,classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html: `Post Updated Successfully!`,classes:"#2e7d32 green darken-3"})
    //             history.push('/opportunity')
    //         }
    //         setLoading(false)
    //     })
    //     .catch((error) => {
    //         M.toast({html: error,classes:"#c62828 red darken-3"})
    //         setLoading(false)
    //     })
    // }

    return (
        <>
            {
            loading ? <Loading/> :
            <section className="create-post-form">
                <div className="card">
                    <h2>Umix</h2>
                    <div className="input-field">
                        <input type="text"/>
                    </div>
                    <div className="file-field input-field">
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-2">Update</button>
                </div>
            </section>
        }
        </> 
    )
}

export default EditPost
