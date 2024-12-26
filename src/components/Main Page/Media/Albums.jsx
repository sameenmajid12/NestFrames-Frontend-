import { useEffect, useState, useContext } from 'react';
import '../../../styles/media.css'
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
function Photos(){
  const { user } = useContext(UserContext)

  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState(user.albums);
  const [requests, setRequests] = useState(user.albumRequests);
  const [active, setActive] = useState("albums");
  useEffect(()=>{
    document.body.className = 'body-default';
    getPhotos();
  },[]);
  const location = useLocation();
  
  useEffect(()=>{
    setActive(location.pathname.split("/")[2]||"albums");
  },[location]);
  
  async function getPhotos(){
    const photos = await fetch(`http://localhost:3002/photos/${user._id}`);
    const photoSrcs = await photos.json();
    setPhotos(photoSrcs);
  }

  return (
    <div 
    className="gallery-page-container">
      <h1>{active.charAt(0).toUpperCase()+active.slice(1)}{active==="requests"?<span className='album-request-length'> {`(${requests.length})`}</span>:''}</h1>
      <div className='h2-container'>
          <div className="selector-container">
            <span className='selector-line'></span>
            <span style={active==='albums'?{left:'0%'}:active==='photos'?{left:'33%'}:active==='requests'?{left:'67%'}:''} id='selected-line'></span>
            <Link to='/media'>
              <div  
                className={` selector ${active==='albums'?'selector-active':''}`}><i className="fa-solid fa-image fa-xs"></i><p>Albums</p>
              </div>
            </Link>
            <Link to='/media/photos'>
                <div 
                 
                  className={` selector ${active==='photos'?'selector-active':''}`}><i className="fa-solid fa-images"></i><p>Photos</p> 
                </div>
            </Link>
            <Link to='/media/requests'>
              <div 
                className={`selector ${active==='requests'?'selector-active':''}`}><i className="fa-solid fa-circle-plus"></i><p>Requests</p>
              </div>
            </Link>
            
          </div>
      </div>
      
      <Outlet context={{photos:photos, requests:requests, setRequests:setRequests, albums:albums, setAlbums:setAlbums}}/>
    </div>
  )
}

export default Photos;