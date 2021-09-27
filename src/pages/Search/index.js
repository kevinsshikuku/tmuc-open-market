import React,{useState} from 'react';
import {useQuery} from "@apollo/client";
import {useDebounce} from "../../Utils/useDebounce";
import EmojiEmotionsOutlined from "@material-ui/icons/EmojiEmotionsOutlined"

import OtherHeader from "../../components/Header/otherHeader";
import { SEARCH_POSTS } from "../../graphql/post";
import  SerchResult from "./searchResult";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import CircularProgress from  "@material-ui/core/CircularProgress"
import "./search.css"


/**Search component */
const  Search = () => {

    const [value, setValue] = useState("");
    UsedocumentTitle("Search")

    const handleChange = (e) => {
      setValue( e.target.value )
      }
   const debouncedValue = useDebounce(value, 500)

  const {data, loading} = useQuery(SEARCH_POSTS, {variables:{searchQuery:debouncedValue}});





  //  let searchResults;
  //    if(data && !loading){
  //      searchResults = data.searchPosts;
  //    }

    const searchInput = (
                          <div>
                            <input type="Search" onChange={handleChange} value={value} placeholder="search..." autoFocus />
                          </div>
                     )

  let loader;
    if(loading && !data){
      loader = (
        <div className="searching">
          <OtherHeader tag={searchInput}/>
          <CircularProgress/>
          <h4>searching...</h4>
        </div>
      )
    }

  let notfound;
    if(!loading && data.searchPosts.length < 1){
      notfound = (
        <div className="searching">
          <OtherHeader tag={searchInput}/>
          <h4> ooops no results found !!</h4>
           <p style={{color:"red"}} ><EmojiEmotionsOutlined fontSize="large" /></p> <br/> <br/>
           <p>Type something</p>
        </div>
      )
    }


  const main = (
                <div>
              {data && data.searchPosts.map( post => (
                <div key={post.id}>
                  <SerchResult post={post}/>
                </div>
              ))}
             </div>
  )
      return (
     <>
       <OtherHeader tag={searchInput}/>
       <div className="searchContainer" >
          { loading ? loader : main }
          {!loading && data.searchPosts.length < 1  && notfound}
       </div>
     </>
      )
}

export default Search;
