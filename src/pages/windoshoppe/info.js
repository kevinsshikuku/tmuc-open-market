import React from 'react';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import People from '@material-ui/icons/People';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined'
import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import  './about.css'




/** App information */
const Info = () => {
UsedocumentTitle("Info")
const {toAppInfo} = Routes()


return(
<>
<div className="container" style={{marginTop:"7rem"}}>

<div>

      <div className="contactCard">
          <div className='info_app-about'>
            <People/>
            <div>
                <h4>Contact windoshoppe incase of;</h4>
                <p>Questions? Need help?</p>
                <p>Want to advertise?</p>
            </div>
          </div>

         <div className="call_us">
           <p>0740253367</p>
           <a href={`href="tel:0740253367"`}>
              <div className="contact_us">
                 <PhoneAndroidIcon/>
                <p>Call center</p>
              </div>
           </a>

            <a href={`https://api.whatsapp.com/send?phone=+254740253367`}>
                <div className="contact_us">
                  <WhatsAppIcon/>
                  <p>WhatsApp</p>
                </div>
            </a>

         </div>
      </div>

      <div className="infoCard">
        <div className='info_app-about'>
          <InfoOutlined/>
           <div>
              <h4>App info</h4>
              <p>Get to know about windoshoppe</p>
           </div>
        </div>
           <div>
              <ul>
                  <li>Sell and Buy items at fair price.</li>
                  <li>Incase you're intrested of someone's product Call or WhatsApp the Number on their Bio.</li>
              </ul>
          </div>
      </div>

      <div className="policyCard">
        <div className='info_app-about'>
          <FileCopyOutlined/>
           <div>
              <h4>Terms and usage policy</h4>
           </div>
        </div>

        <p>We dont claim any direct responsibilty for content published on our platform. Users are warned to be careful on who they get into transuction with. Content on manupilation, intimidation and descrimination  are not allowed.</p>
      </div>


      <div className="moreInfoCard" onClick={toAppInfo}>
          <div className='info_app-about'>
            <QuestionAnswerOutlined/>
            <div>
                <h4>More info</h4>
                <p>More information about windoshoppe.</p>
            </div>
          </div>
      </div>

      <div className="noteCard">
        <div className='info_app-about'>
          <NoteAddOutlined/>
           <div>
              <h4>Note!</h4>
           </div>
        </div>
        <div className="notice">
          <DirectionsWalkIcon/>
          <p style={{color:"deeppink"}}> Happy selling and Buying </p>
        </div>
      </div>
  </div>
</div>

</>
    )
}

export default Info;