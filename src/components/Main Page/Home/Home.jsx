import { Outlet } from "react-router-dom";
import '../../../styles/home.css'
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
function Home(){
  const {user} = useContext(UserContext);
  const navigate=useNavigate();
  useEffect(()=>{
    document.body.className = 'body-home';
    if(user===null){
      navigate('/Sign-in');
    }
    return ()=>{
      document.body.className = '';
    }
  },[])
 
 
  return(
    <div className="home-page-container">
        <div className="post-container">
          <Outlet/>
          
        </div>
      <div className="home-side-container">
        <h1 className="home-side-header">Popular Events</h1>
      </div>
    </div>
    
  )
}

export default Home;