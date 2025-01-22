import { useNavigate } from 'react-router-dom';
import '../../../styles/utils.css'
import { useEffect, useRef } from 'react';
function FriendDropDown({friend, setVisibility}){
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const handleVisibility=(e)=>{
    if(containerRef.current && !containerRef.current.contains(e.target) && setVisibility){
      setVisibility(false)
    }
  }
  useEffect(()=>{
   document.body.addEventListener("mousedown", handleVisibility);
    return () => {
      document.body.removeEventListener("mousedown", handleVisibility);
    };
  },[])
  const viewProfile=()=>{
    navigate(`/${friend.username}`);
  }
  const sendMessage=()=>{
   
  }
  const unfriend=()=>{
    
  }
  return(
    <div ref={containerRef} className="friend-drop-down-container">
      <div onClick={()=>viewProfile} className='friend-drop-down-option'>View Profile</div>
      <div className='friend-drop-down-option'>Send Message</div>
      <div className='friend-drop-down-option'>Unfriend</div>
    </div>
  )
}

export default FriendDropDown;