import React,{useState} from 'react';
import  "./createPost.css";
import PostImageUpload from "./PostImageUpload";

import {useMutation } from "@apollo/client"
import {useStore } from '../../store';
import {MAX_POST_IMAGE_SIZE } from '../../constants/ImageSize';
import {CREATE_POST, GET_POSTS} from "../../graphql/post";
import {CircularProgress, TextareaAutosize} from '@material-ui/core';
import {Close} from '@material-ui/icons';




/**
 * create item component
 */
export const  CreateItem = () => {
  const [{ auth }] = useStore();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [crossedPrice, setCrossedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');


   const handleReset = () => {
    setTitle('');
    setImage('');
    setErrors('');
    setPrice('');
    setLocation('');
    setCrossedPrice('');
    setDescription('')
    setFeatures('')
  };

/** handles post image upload ! */
 const handlePostImageUpload = e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size >= MAX_POST_IMAGE_SIZE) {
          window.alert(`File size should be less then ${MAX_POST_IMAGE_SIZE / 3000000}Mb`);
          throw new Error( `File size should be less then ${MAX_POST_IMAGE_SIZE / 3000000}Mb`)
        }
      previewFile(file)
  };

  const previewFile = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setImage(reader.result);
        }
  }



const values = { title, description, price ,crossedPrice,location, image, features, authorId: auth.user.id}

 const [createPost, { loading }] = useMutation(CREATE_POST,{
    variables: values,
    onError(err){
      setErrors(err)
    },
    update(cache,{data}){
      //add new data to existing data
      const newPost = data?.createPost;
      const existingPosts = cache.readQuery({
        query:GET_POSTS,
        variables:{
          skip:0,
          limit:50,
        }
      });
      cache.writeQuery({
        query:GET_POSTS,
        variables:{
          skip:0,
          limit:50,
        },
        data:{
          getPosts:{
              posts:[...existingPosts?.getPosts.posts, newPost]
          }
        }
      })
    }
});

const hadleTitleChange = e => setTitle(e.target.value);
const hadleFeaturesChange = e => setFeatures(e.target.value);
const handlePriceChange = e => setPrice(e.target.value);
const handleLocationChange = e => setLocation(e.target.value);
const handleCrossedPriceChange = e => setCrossedPrice(e.target.value);
const handleDescriptionChange = e => setDescription(e.target.value)


const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    handleReset();
    setWarning("Item displayed successfully!");
};

/** Loading spinnner */
  let loader;
  if(loading){
    return loader = (
      <div className="display_item_loader">
        <CircularProgress/>
        <h1>Displaying your item ...</h1>

      </div>
    )
  }

const postImagePrevew =
   (<div className="image_preview">
      {image && (
      <>
          <div>
            <img  src={image} width="100%" alt="preview" />
          </div>
      </>
      )}
   </div>)


/** Display item form */
const form = (
 <form onSubmit={handleSubmit}>

   <div className="create_post_wrapper">
   {postImagePrevew}
   {image && <p onClick={ () => setImage("") } className="close" > <Close/> </p>}
   <br/>
   <div className="post_description">
       <div>
          <TextareaAutosize
            placeholder="Name"
            name="title"
            rows={1}
            onChange={hadleTitleChange}
            value={values.title}
            className="title"
          />
       </div>

        <div >
           <TextareaAutosize
               placeholder="Product description"
               rowsMin={1}
               name='description'
               onChange={handleDescriptionChange}
               value={values.description}
               className="description"
               />
       </div>
        <div >
           <TextareaAutosize
               placeholder="Separet product features by  #  "
               rowsMin={1}
               name='features'
               onChange={hadleFeaturesChange}
               value={values.features}
               className="description"
               />
       </div>
       <div className="price_input">
           <input
             placeholder='Price'
             name="price"
             value={values.price}
             style={{color:"blue"}}
             onChange={handlePriceChange}
             className="priceInput"
           /> <br/>
           <input
             placeholder='Price before'
             name="crossedPrice"
             style={{color:"red"}}
             value={values.crossedPrice}
             onChange={handleCrossedPriceChange}
             className="priceInput"
           />
           <input
             placeholder='Located?'
             name="location"
             style={{color:"green"}}
             value={values.location}
             onChange={handleLocationChange}
             className="priceInput"
           />
       <div className="photo_input">
          <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload}/>
       </div>
       </div>
   </div>

         <div className="displayBtn">
             <button onClick={ handleSubmit }>
                 Display
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
<div className="preview" >
   {loading ? loader : form}
   {errors && error}
   {!errors && warning &&  message}

</div>
  )
};
