import React from 'react';

import Other from "../../components/Header/otherHeader";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {CreateItem} from "../../components/CreateItem/CreateItem";


/**Sell component */
function Sell() {
        UsedocumentTitle("Sell")



    return (
   <>
     <Other tag="Display an item to sell"/>
     <div style={{marginTop:"3rem"}}>
       <CreateItem/>
     </div>
   </>
    )
}

export default Sell;
