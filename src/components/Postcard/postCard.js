import React from "react";
import {useHistory} from "react-router-dom";
import useGaEvents from "../../Hooks/useGAEvents";
import  "./postcard.css"
import Img from "react-cool-img";
import Netlify from "../../Assets/placeholder.jpeg"

/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();
      const GAEventTracker = useGaEvents("Click on item");
      const {id , image, inStock, price,crossedPrice, title} =  post ;

/* -------------------------------------------------------------------------- */
      const toPost = async (e) => {
          GAEventTracker("Item view", e.target.currentSrc);
          history.push(`/item/${id}`);
      }



   return(
  <>

    <div className="postCard">
        <div>
        { image ? <div className="cardMedia">
            {
             <div onClick={toPost} >
              <Img
                style={{
                  backgroundColor:"#a2a2a282",
                  width:"100%",
                  height:"30%",
                  borderRadius:"15px"
                }}
                width="100%"
                height="50%"
                src={image}
                alt={title}
                debounce={1000}
              />
            </div>
             }
        </div> :
        <div onClick={toPost} >
              <Img
                style={{
                  backgroundColor:"#a2a2a282",
                  width:"100%",
                  height:"30%",
                  borderRadius:"15px"
                }}
                width="100%"
                height="50%"
                src={Netlify}
                alt={title}
                debounce={1000}
              />
            </div> }
        { price &&
        <>

        <div className="itemPrice">
          {title}
          <div className="priceInfo" onClick={toPost}>
            {price && <p style={{color:"blue"}} >Ksh {price}</p>}
            {crossedPrice && <p className="crossedPrice">{crossedPrice}</p>}
          </div>
        </div>
        <div> {inStock && <p className="inStock">{inStock} in Stock</p>}</div>
        </>
        }

      </div>
    </div>
  </>

   )
}
export default Postcard;
