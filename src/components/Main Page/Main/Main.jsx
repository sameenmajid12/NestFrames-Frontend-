import React, { useContext, useEffect, useState } from 'react';
import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import { Outlet } from 'react-router-dom';
import Create from './Create.jsx';
import { UserContext } from '../../UserContext.jsx';
function Main(){
  const {user,setUser} = useContext(UserContext);
  const [sideBarFull, setSideBarFull] = useState(true);
  useEffect(()=>{ 
    async function updateOnRefresh(){
      try{
        const response = await fetch(`http://localhost:3002/users/${user.username}`);
        if(!response.ok){
          throw new Error(`Error: ${response.statusText}`)
        }
        const userUpdates = await response.json();
        setUser(userUpdates);
      }
      catch(error){
        console.log(error);
      }

    }
    updateOnRefresh();
  },[]);
  return (
  <div>
    <Create/>
    <Header sideBarFull={sideBarFull} setSideBarFull={setSideBarFull}/>
    <SideBar sideBarFull={sideBarFull}/>
    <Outlet/>
  </div>
  );

} 

export default Main;