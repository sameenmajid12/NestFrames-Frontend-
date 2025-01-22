import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import "../../../styles/albums.css";
import AlbumHeader from "./AlbumHeader";
import AlbumPhotos from "./AlbumPhotos";
import Loading from "../Utils/Loading";
function AlbumBody() {
  useEffect(()=>{
    document.body.className = 'body-default';
  },[]);
  const { screen1000, screen650 } = useOutletContext();
  const [album, setAlbum] = useState(null);
  const [albumName, setAlbumName] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const location = useLocation();
  const albumId = location.pathname.split("/")[2];
  const fetchAlbum = async () => {
    try {
      const res = await fetch(`http://localhost:3002/albums/${albumId}`);
      if (res.ok) {
        const albumData = await res.json();
        setAlbum(albumData);
        setAlbumName(albumData.name);
        setCollaborators(albumData.users);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching album:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [albumId]);

  if (loading) return <Loading/>;
  if (notFound) return <Loading/>;

  return (
    <div className="album-page-container">
      <AlbumHeader
        setAlbum={setAlbum}
        albumName={albumName}
        setAlbumName={setAlbumName}
        albumId={albumId}
        album={album}
        collaborators={collaborators}
        setCollaborators={setCollaborators}
        screen1000={screen1000}
        screen650={screen650}
      />
      <hr className="album-body-divider" />
      <AlbumPhotos screen1000={screen1000} album={album} setAlbum={setAlbum} collaborators={collaborators} setCollaborators={setCollaborators} albumId={albumId} />
    </div>
  );
}

export default AlbumBody;