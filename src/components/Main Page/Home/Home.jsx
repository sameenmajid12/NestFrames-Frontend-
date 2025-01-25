import { Outlet } from "react-router-dom";
import "../../../styles/home.css";
import { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "../Contexts/UserContext";
import { AuthContext } from "../Contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularAlbums from "./PopularAlbums";
import FindFriends from "./FindFriends";
import {NotificationContext} from '../Contexts/NotificationContext';
function Home() {
  const { user } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const {addNotification} = useContext(NotificationContext);
  const containerRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [friends, setFriends] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.className = "body-home";
    return () => {
      document.body.className = "";
    };
  }, []);
  useEffect(() => {
    getPosts();
  }, [user, page]);
  useEffect(()=>{
    getPopularAlbums();
    getSuggestedFriends();
  },[])
  const getPopularAlbums = async()=>{
      try{
        const response = await fetch("http://localhost:3002/albums/get/popular");
        if(response.ok){
          const data = await response.json();
          setAlbums(data.albums);
        }
        else{
          addNotification(false, data.message);
          console.log(data.message);
        }
      }
      catch(error){

      }
  }
  const getSuggestedFriends = async()=>{
    try{
      const response = await fetch(`http://localhost:3002/users/${user._id}/findFriends`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
        setFriends(data.friends);
      }
      else{
        addNotification(false, data.message);
        console.log(data.message);
      }
    }
    catch(error){
    }
  }
  const getPosts = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      console.log("getting posts");
      const limit = 5;
      const skip = page * 5;
      const response = await fetch(
        `http://localhost:3002/users/${user.username}/getPosts?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPosts((prev) => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
        setInitialLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!initialLoading && containerRef.current) {
      document.body.addEventListener("scroll", handleScroll);
    }
  }, [containerRef, initialLoading]);
  const handleScroll = () => {
    if (
      document.body.scrollTop + document.body.clientHeight >=
      document.body.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  if (initialLoading) return;
  return (
    <div className="home-page-container" ref={containerRef}>
      {posts && friends && albums?<><FindFriends friends={friends} setFriends={setFriends}/>
      <InfiniteScroll
        className="post-container"
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<div className="post-loader-container"><div className="post-loader"></div></div>}
        endMessage={<div className="post-end-container"><img src="/assets/panda.png"></img><p>You’ve scrolled to the bottom! Make some posts to fill up the feed!</p></div>}
        scrollThreshold={0.9}
      >
        <Outlet
          context={{ posts: posts, hasMore: hasMore, setPage: setPage }}
        />
      </InfiniteScroll>
      <PopularAlbums albums={albums}/>
    </>:''}
    </div>
  );
}

export default Home;
