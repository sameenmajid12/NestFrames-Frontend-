import { useOutlet, useOutletContext } from 'react-router-dom';
import AlbumContent from '../../Media/AlbumContent';
function ProfileAlbums(){
  const {profile} = useOutletContext();
  console.log(profile);
  return (
    <AlbumContent albumProps={profile.albums}/>
  )
}

export default ProfileAlbums;