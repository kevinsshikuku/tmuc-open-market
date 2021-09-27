import {useState, useEffect} from "react";


/** Detecting online and offline events */
function UseNetworkStatus() {
 let [online, isOnline] = useState(navigator.onLine);

 const setOnline = () => {
  isOnline(true);
 }

  const setOffline = () => {
  isOnline(false);
 }

 //register event listeners
 useEffect(() => {
  window.addEventListener("online", setOnline);
  window.addEventListener("offline", setOffline);

  //clean up if we unmount
  return () => {
   window.removeEventListener("online", setOnline);
   window.removeEventListener("offline", setOffline);
  }
 },[])

 return online
}

export default UseNetworkStatus;
