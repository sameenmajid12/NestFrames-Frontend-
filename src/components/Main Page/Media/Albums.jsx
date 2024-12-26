import { useEffect, useState, useContext } from 'react';
import '../../../styles/photos.css'
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
function Photos(){
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState(JSON.parse(localStorage.getItem('activePhotosTab'))||'Photos');
  useEffect(()=>{
    document.body.className = 'body-default';
    getPhotos();
  },[]);
  
  useEffect(()=>{
    localStorage.setItem('activePhotosTab',JSON.stringify(active))
  },[active]);
  
  const { user } = useContext(UserContext)
  async function getPhotos(){
    const photos = await fetch(`http://localhost:3002/photos/${user._id}`);
    const photoSrcs = await photos.json();
    setPhotos(photoSrcs);
  }

  return (
    <div 
    className="gallery-page-container">
      <h1>{active}{active==="Requests"?<span className='album-request-length'> {`(${user.albumRequests.length})`}</span>:''}</h1>
      <div className='h2-container'>
          <div className="selector-container">
            <span className='selector-line'></span>
            <span style={active==='Albums'?{left:'0%'}:active==='Photos'?{left:'33%'}:active==='Requests'?{left:'67%'}:''} id='selected-line'></span>
            <Link to='/media'>
              <div onClick={()=>{
                setActive('Albums');}} 
                className={` selector ${active==='Albums'?'selector-active':''}`}><i className="fa-solid fa-image fa-xs"></i><p>Albums</p>
              </div>
            </Link>
            <Link to='/media/photos'>
                <div 
                  onClick={()=>{
                    setActive('Photos');
                  }}
                  className={` selector ${active==='Photos'?'selector-active':''}`}><i className="fa-solid fa-images"></i><p>Photos</p> 
                </div>
            </Link>
            <Link to='/media/requests'>
              <div onClick={()=>{
                setActive('Requests');
                }} 
                className={`selector ${active==='Requests'?'selector-active':''}`}><i className="fa-solid fa-circle-plus"></i><p>Requests</p>
              </div>
            </Link>
            
          </div>
      </div>
      
      <Outlet context={{photos:photos}}/>
    </div>
  )
}

export default Photos;