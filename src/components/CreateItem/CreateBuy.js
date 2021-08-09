import React,{useState} from 'react';
import  "./createPost.css";


import {useMutation} from "@apollo/client"
import {useStore } from '../../store';
import {CREATE_BUY,GET_BUYS} from "../../graphql/buy";
import {CircularProgress, TextareaAutosize} from '@material-ui/core';





/**
 * create post component
 */
function PurchaseForm(){
  const [{ auth }] = useStore();
  const [title, setTitle] = useState('');
  const [pricerange, setPricerange] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');



   const handleReset = () => {
    setTitle('');
    setErrors('');
    setPricerange('');
    setDescription('')
    setFeatures('')
  };



const values = { title, description, pricerange , features, authorId: auth.user.id}

 const [createBuy, { loading }] = useMutation(CREATE_BUY,{
    variables: values,
      onError(err){
      setErrors(err)
    },
    update(cache,{data}){
      //add new data to existing data
      const newBuy = data?.createBuy;
      const existingBuys = cache.readQuery({
        query:GET_BUYS,
        variables:{
          skip:0,
          limit:50,
        }
      });
      console.log(newBuy);
      cache.writeQuery({
        query:GET_BUYS,
        variables:{
          skip:0,
          limit:50,
        },
        data:{
          getBuys:{
              buys:[...existingBuys?.getBuys.buys, newBuy]
          }
        }
      })
    }
});

const hadleTitleChange = e => setTitle(e.target.value);
const hadleFeaturesChange = e => setFeatures(e.target.value);
const handlePriceChange = e => setPricerange(e.target.value);
const handleDescriptionChange = e => setDescription(e.target.value)


const handleSubmit = async (e) => {
    e.preventDefault();
    createBuy();
    handleReset();
    setWarning("Request displayed successfully!");
};

/** Loading spinnner */
  let loader;
  if(loading){
    return loader = (
      <div className="display_item_loader">
        <CircularProgress/>
        <h1>displaying your purchase request...</h1>

      </div>
    )
  }

/** Display item form */
const form = (
 <form onSubmit={handleSubmit}>

   <div className="create_post_wrapper">
   <div className="post_description">
       <div>
          <TextareaAutosize
            placeholder="what do you want to buy?"
            name="title"
            rows="1"
            onChange={hadleTitleChange}
            value={values.title}
            className="title"
          />
       </div>

        <div >
           <TextareaAutosize
               placeholder="product description"
               rowsMin={2}
               name='description'
               onChange={handleDescriptionChange}
               value={values.description}
               className="description"
               />
       </div>
        <div >
           <TextareaAutosize
               placeholder="separet specific features by  #  "
               rowsMin={2}
               name='features'
               onChange={hadleFeaturesChange}
               value={values.features}
               className="description"
               />
       </div>
       <div className="price_input">
           <input
             placeholder='price range'
             name="pricerange"
             value={values.pricerange}
             style={{color:"blue"}}
             onChange={handlePriceChange}
             className="priceInput"
           /> <br/>
       </div>
   </div>
         <br/>
         <div className="displayBtn">
             <button onClick={ handleSubmit }>
                 Send
             </button>
         </div>
     </div>
 </form>
)

const error = (
  <div className="display_item_error">
    {errors.message}
  </div>
)


const message = (
  <div className="display_item_alert" >
    {warning}
  </div>
)

  return(
<>
   {loading ? loader : form}
   {errors && error}
   {!errors && warning &&  message}

</>
  )
};
export default PurchaseForm;