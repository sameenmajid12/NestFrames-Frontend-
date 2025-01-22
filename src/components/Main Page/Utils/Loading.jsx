import { useEffect } from "react";

function Loading(){
  useEffect(()=>{
    document.body.className="";
  },[])
  return(
  <div className="loading-page">
    <img src="/assets/favico.png"></img>
  </div>)
}

export default Loading;