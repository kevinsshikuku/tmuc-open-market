import React,{useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {IconButton, CircularProgress} from '@material-ui/core';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import {CloudUploadOutlined} from "@material-ui/icons";


import {useMutation } from "@apollo/client"
import {useStore } from '../../store';
import {MAX_POST_IMAGE_SIZE } from '../../constants/ImageSize';
import {UPLOAD_PHOTO, GET_AUTH_USER} from "../../graphql/user";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
    padding:0,
    margin:0,
  },
}));


/**
 * Component for uploading post image
 */
const ImageUpload = ({isCover}) => {
    const classes = useStyles();
    const [{ auth }] = useStore();
    const [image, setImage] = useState('');
    const [error, setError] = useState(null)


/** handles post image upload ! */
 const handleImageUpload = e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size >= MAX_POST_IMAGE_SIZE) {
           setError(`File size should be less then ${MAX_POST_IMAGE_SIZE / 3000000}Mb`)
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

 const values = { image,  id: auth.user.id, isCover};
 const [createImage, { loading }] = useMutation(UPLOAD_PHOTO,{
    variables: values,
      onError(err){
        console.log(err)
      setError(err)
    },
    update(cache, {data}){
      //add new data to existing data
      const newData = data?.createPost
      cache.reset();
      cache.writeQuery({
        query:GET_AUTH_USER,
        data:{
          getAuthUser:{
              image: newData
          }
        }
      })
    }
});

const handleSubmit = (e) => {
    e.preventDefault();
    createImage();
};


  return(
  <div className="upload_btn">
     { loading ? <CircularProgress/> :
      <form  onSubmit={handleSubmit} className={classes.form}>
        { image ?  <IconButton size="medium"> <button> <CloudUploadOutlined/> </button> </IconButton > :
         <>
           <input
                accept="image/x-png,image/jpeg"
                name="image"
                className={classes.input}
                onChange={handleImageUpload}
                id="icon-button-file"
                type="file"
                   />
            <label htmlFor="icon-button-file">
              <IconButton color="inherit" aria-label="upload picture" size="medium" component="span">
                  <AddAPhoto/>
              </IconButton>
            </label>
            {error && <p>{error}</p>}
         </>}
      </form>}
   </div>
  )

};

export default ImageUpload;

