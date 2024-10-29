import { useEffect, useState } from 'react';
import '../../../styles/photos.css'
import { Outlet, Link } from 'react-router-dom';
function Photos(){
  useEffect(()=>{
    document.body.className = 'body-default';
  },[]);
  
  const [active, setActive] = useState(JSON.parse(localStorage.getItem('activePhotosTab'))||'Photos');
  useEffect(()=>{
    localStorage.setItem('activePhotosTab',JSON.stringify(active))
  },[active]);
 
 
  return (
    <div 
    className="gallery-page-container">
      <h1>{active}</h1>
      <div className='h2-container'>
          <div className="selector-container">
            <span className='selector-line'></span>
            <span style={active==='Photos'?{left:'0%'}:active==='Albums'?{left:'33%'}:active==='Tagged'?{left:'67%'}:''} id='selected-line'></span>
            <Link to='/Photos'>
              <div onClick={()=>{
                setActive('Photos');}} 
                className={` selector ${active==='Photos'?'selector-active':''}`}><i className="fa-solid fa-image fa-xs"></i><p>Photos</p>
              </div>
            </Link>
            <Link to='/Photos/Albums'>
                <div 
                  onClick={()=>{
                    setActive('Albums');
                  }}
                  className={` selector ${active==='Albums'?'selector-active':''}`}><i className="fa-solid fa-images"></i><p>Albums</p> 
                </div>
            </Link>
            <Link to='/Photos/Tagged'>
              <div onClick={()=>{
                setActive('Tagged');
                }} 
                className={`selector ${active==='Tagged'?'selector-active':''}`}><i className="fa-solid fa-circle-user"></i><p>Tagged</p>
              </div>
            </Link>
            
          </div>
          
          <div className='sort-button'>
            Sort by <span className='sort-button-span'>Date<i className={"fa-solid fa-chevron-down sort-button-arrowDown"}></i></span>
          </div>
      </div>
      
      <Outlet/>
    </div>
  )
}

export default Photos;