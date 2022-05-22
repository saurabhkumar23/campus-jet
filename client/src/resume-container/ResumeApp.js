import React from 'react';
import logo from './logo.svg';
import Resume from './react-resume-builder/index'
import './app.scss';
import Footer from'./footer'
import data from './resumeSchema'
const ResumeApp = ()=>{
    
  return (
    <div className="">
        <div class="section">
          <div className="card padding20">
            <Resume data={data} onSave={(x)=>{console.log(x)}} />
            {/* <Footer /> */}
          </div>
        </div>
    </div>
  );
  }
export default ResumeApp;
