import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../../App";
import Loading from "../Loading";

const EditOpportunity = () => {
  const { opportunityId } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [ctc, setCtc] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [minCgpa, setMinCgpa] = useState("")
  const [employementType, setEmployementType] = useState("");
  const [location, setLocation] = useState("");
  const [profile, setProfile] = useState("");
  const [joining, setJoining] = useState("");
  const [bond, setBond] = useState("");
  const [lastDate, setlastDate] = useState("");

  // redirect to home, if already logged in
  useEffect(() => {
    setLoading(true);
    fetch("/isAdmin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          history.push("/Opportunity");
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
    fetch(`/opportunity/${opportunityId}`, {
      method: "get",
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
          setData(result);
          setJobTitle(result?.jobTitle);
          setCompanyName(result?.companyName);
          setApplyLink(result?.applyLink);
          setCtc(result?.ctc);
          setDescription(result?.description);
          setEligibility(result?.eligibility);
          setMinCgpa(result?.minCgpa);
          setEmployementType(result?.employementType);
          setLocation(result?.location);
          setJoining(result?.joining);
          setBond(result?.bond);
          setlastDate(result?.lastDate);
          setProfile(result?.profile);
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  }, []);

  // api call to login authentication
  const submitData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`/opportunity/edit/${opportunityId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id: opportunityId,
        companyName,
        applyLink,
        ctc,
        jobTitle,
        description,
        eligibility,
        minCgpa,
        employementType,
        location,
        lastDate,
        profile,
        joining,
        bond
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          console.log("request hit");
          console.log(data);
          M.toast({ html: data?.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data?.message, classes: "#2e7d32 green darken-3" });
          history.push("/opportunity");
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  };

  const deleteOpportunityHandler = () => {
    setLoading(true);
    fetch(`/opportunity/${opportunityId}`, {
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
          history.push("/opportunity");
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
  };

  return (
    <>
      {loading || !data ? (
        <Loading />
      ) : (
        <section className="form-main-container edit_opportunity_form">
          <section className="login-form">
            <div className="card">
              <h2>EDIT OPPORTUNITY FORM</h2>
              <form onSubmit={(e) => submitData(e)}>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                    id="job_title"
                  />
                  <label for="job_title" className="active">Job Title</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    id="company_name"
                  />
                  <label for="company_name" className="active">Company Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Apply Link"
                    value={applyLink}
                    onChange={(e) => setApplyLink(e.target.value)}
                    required
                    id="apply_link"
                  />
                  <label for="apply_link" className="active">Apply Link</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="CTC"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    required
                    id="ctc"
                  />
                  <label for="ctc" className="active">CTC</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    required
                    id="profile"
                  />
                  <label for="profile" className="active">Profile</label>
                </div>
                <div class="input-field ">
                  <select
                    class="browser-default"
                    onChange={(e) => setJoining(e.target.value)}
                    required
                    value={joining}
                    id="joining"
                  >
                    <option value="" disabled selected>
                      Joining Period
                    </option>
                    <option value="Immediate">Immediate</option>
                    <option value="One Week">One Week</option>
                    <option value="Two Week">Two Week</option>
                    <option value="One Month">One Month</option>
                    <option value="Two Month">Two Month</option>
                    <option value="Four Month">Four Month</option>
                    <option value="Six Month">Six Month</option>
                    <option value="One Year">One Year</option>
                  </select>
                  <label for="joining" className="active select-label">Joining Period</label>
                </div>
                <div class="input-field ">
                  <select
                    class="browser-default"
                    onChange={(e) => setBond(e.target.value)}
                    required
                    value={bond}
                    id="bond"
                  >
                    <option value="" disabled selected>
                      Bond Period
                    </option>
                    <option value="No">No</option>
                    <option value="Six Month">Six Month</option>
                    <option value="One Year">One Year</option>
                    <option value="Two Year">Two Year</option>
                    <option value="Three Year">Three Year</option>
                  </select>
                  <label for="bond" className="active select-label">Bond Period</label>
                </div>
                <div class="desc-textarea">
                      <div class="input-field">
                        <textarea
                          id="textarea1"
                          class="materialize-textarea"
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          style={{'height':'180px' , 'overflow':'auto'}}
                          id="description"
                        ></textarea>
                         <label for="description" className="active">Description</label>
                        
                      </div>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Eligibility"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    required
                    id="eligibility"
                  />
                         <label for="eligibility" className="active">Eligibility</label>

                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Minimum CGPA Required"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                    required
                    id="minCgpa"
                  />
                         <label for="minCgpa" className="active">Minimum CGPA Required</label>

                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    id="location"
                  />
                         <label for="location" className="active">Location</label>

                </div>
                <div class="input-field ">
                  <select
                    class="browser-default"
                    onChange={(e) => setEmployementType(e.target.value)}
                    required
                    value={employementType}
                    id="employementType"
                  >
                    <option value="" disabled selected>
                      Employment Type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <label for="employementType" className="active select-label">Employment Type</label>

                </div>
                <div className="input-field">
                  <input
                    type="date"
                    placeholder="Last Date To Apply"
                    value={lastDate}
                    onChange={(e) => setlastDate(e.target.value)}
                    required
                    id="last"
                  />
                  <label for="last">Last Date To Apply</label>
                </div>
                <button
                  type="submit"
                  style={{ marginRight: "10px" }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-2"
                >
                  Save
                </button>
                <button
                  onClick={deleteOpportunityHandler}
                  className="btn waves-effect waves-light #d50000 red accent-4"
                >
                  Delete
                </button>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default EditOpportunity;
