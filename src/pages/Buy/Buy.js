import React from 'react';

import Other from "../../components/Header/otherHeader";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import PurchaseForm from "../../components/CreateItem/CreateBuy";


/**Sell component */
function Sell() {
        UsedocumentTitle("Buy")



    return (
   <>
     <Other tag="Describe your choice"/>
     <div style={{marginTop:"3rem"}} >
       <PurchaseForm/>
     </div>
   </>
    )
}

export default Sell;
