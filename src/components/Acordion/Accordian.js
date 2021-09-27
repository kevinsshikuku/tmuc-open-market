import React,{useState} from 'react';
import ArrowDropUpOutlined from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownRounded from '@material-ui/icons/ArrowDropDownRounded';
import  "./acodion.css"


/** Accordian component that shows post description */
function Accordian({description}) {
  const [clicked, setCliked] = useState(false)
  const togle = () => {
        if(clicked){
          return setCliked(null)
        }
        setCliked(true)
  }

const shortDescription = description.slice(0,30)


 return (
<>
  <div onClick={togle} className="acordionDescription">
      <span style={{opacity: clicked ? "0" : "1"}} >{`${shortDescription}...`}</span>
      {clicked ?  <ArrowDropUpOutlined/> : <ArrowDropDownRounded/>}
  </div>
  {clicked && <p className="description">{description}</p>}
</>
 )
}

export default Accordian;
