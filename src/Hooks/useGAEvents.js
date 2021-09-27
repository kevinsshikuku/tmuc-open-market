import ReactGA from "react-ga";

ReactGA.initialize('G-TZFVVVBBZ4');

/** Google analytics events tracker */
const useGaEvents = ( category = "Event category") => {
 const trackEvent = (action="action" , label="label") => {
   ReactGA.event({
       category, action, label
 });
 }
 return trackEvent;
}

export default useGaEvents
