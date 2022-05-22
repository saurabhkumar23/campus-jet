import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../../App";
import Loading from "../Loading";

const AddOpportunity = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [ctc, setCtc] = useState("");
  const [profile, setProfile] = useState("");
  const [joining, setJoining] = useState("");
  const [bond, setBond] = useState("");
  const [description, setDescription] = useState("");
  const [noOfBacklogAllowed, setNoOfBacklogAllowed] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [minCgpa, setMinCgpa] = useState("")
  const [employementType, setEmployementType] = useState("");
  const [location, setLocation] = useState("");
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
          history.push("/opportunity");
        }
        setLoading(false);
      })
      .catch((error) => {
        M.toast({ html: error, classes: "#c62828 red darken-3" });
        setLoading(false);
      });
    // admin login then user not allowed
  }, []);

  // api call to login authentication
  const submitData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/opportunity/create", {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        applyLink,
        ctc,
        profile,
        joining,
        bond,
        jobTitle,
        description,
        eligibility,
        minCgpa,
        noOfBacklogAllowed,
        employementType,
        location,
        lastDate,
      }),
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
      {loading ? (
        <Loading />
      ) : (
        <section className="form-main-container">
          <section className="login-form">
            <div className="card">
              <h2>ADD OPPORTUNITY FORM</h2>
              <form onSubmit={(e) => submitData(e)}>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Apply Link"
                    value={applyLink}
                    onChange={(e) => setApplyLink(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="CTC"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    required
                  />
                </div>
                <div class="input-field col s12">
                  <select
                    class="browser-default"
                    onChange={(e) => setJoining(e.target.value)}
                    required
                    value={joining}
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
                </div>
                <div class="input-field col s12">
                  <select
                    class="browser-default"
                    onChange={(e) => setBond(e.target.value)}
                    required
                    value={bond}
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
                </div>
                <div class="desc-textarea">
                      <div class="input-field">
                        <textarea
                          id="textarea1"
                          class="materialize-textarea"
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        >{description}</textarea>
                      </div>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Eligibility"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Minimum CGPA Required"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Maximum Backlog Allowed"
                    value={noOfBacklogAllowed}
                    onChange={(e) => setNoOfBacklogAllowed(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div class="input-field col s12">
                  <select
                    class="browser-default"
                    onChange={(e) => setEmployementType(e.target.value)}
                    required
                    value={employementType}
                  >
                    <option value="" disabled selected>
                      Employment Type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div style={{ textAlign: "left" }}>
                  <label for="last">Last Date To Apply</label>
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
                </div>
                <button
                  type="submit"
                  className="btn waves-effect waves-light #64b5f6 blue darken-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default AddOpportunity;
