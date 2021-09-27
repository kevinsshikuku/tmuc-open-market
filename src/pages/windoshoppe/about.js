import React from 'react'
import RouteHeader from "../../components/Header/routeHeader";
import Footer from "../../components/Footer";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import  './about.css'
import Info from "./info";







/**About windoshoppe */
const AboutUs = () => {
UsedocumentTitle("AboutUs")
  return(
      <>
      <RouteHeader tag={"SHOPIIN"}/>
        <Info/>
      <Footer/>
      </>
    )
}

export default AboutUs;