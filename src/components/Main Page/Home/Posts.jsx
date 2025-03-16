import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import AddFriend from "../Utils/AddFriend";
import PostMenu from "../Utils/PostMenu";
function Posts() {
  const { user } = useContext(UserContext);
  const { posts } = useOutletContext();
  const [postMenuVisibility, setPostMenuVisibility] = useState(false);
  const toggleVisibility = ()=>{
    setPostMenuVisibility(prev=>!prev);
  }
  const isUser = (profile) => {
    return profile.username === user.username;
  };
  const isFriend = (profile) => {
    return user.friends.some((friend) => friend.username === profile.username);
  };
  const isRequested = (profile) => {
    return user.friendRequestsSent.some(
      (request) => request.username === profile.username
    );
  };
  
  return (
    
      posts.map((post, index) => {
        return (
          <div key={index} className="posts">
            <div className="post-header">
              <div className="post-header-details">
                <img
                  className="user-picture"
                  src={post.postedBy.profilePic?post.postedBy.profilePic.fileUrl:'/assets/default-avatar.png'}
                ></img>
                <div className="">
                  <p className="user-username">{post.postedBy.fullname}</p>
                  {post.postType === "addedToAlbum" ? (
                    <p className="post-header-type">
                      Added a photo to{" "}
                      <span className="album-name">
                        {post.album ? post.album : ""}
                      </span>
                    </p>
                  ) : (
                    <p className="post-header-type">
                      Created a new Album{" "}
                      <span className="album-name"> Summer 2024</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="post-header-right">
                  {isFriend(post.postedBy) ? (
                    <button className="post-button">
                      Friend{" "}
                      <i className="fa-solid fa-caret-down friend-chevron"></i>
                    </button>
                  ) : isRequested(post.postedBy)?(
                    <button className="post-button">
                    Requested
                  </button>
                  ) : isUser(post.postedBy)?(<button className="post-button">Edit post</button>):<AddFriend stylingClass={'post-button'} receiverUsername={post.postedBy.username}/>}
                <div className="ellipsis">
                  <i onClick={toggleVisibility}
                    className="fa-solid fa-ellipsis  fa-xl"
                    style={{ color: "#444" }}
                  ></i>
                  {
                    postMenuVisibility && <PostMenu toggleVisibility={toggleVisibility}/>
                  }
                </div>
              </div>
            </div>
            <div className="post-caption">{post.caption}</div>
            <div className="post-content">
              <div className="post-image">
                <img src={post.photo.fileUrl}></img>
              </div>
              <div className="post-interaction-container">
                <div className="post-interactions-left">
                  <div className="post-interaction">
                    <i className="fa-regular fa-heart fa-xl"></i>
                    <p>{post.likes}</p>
                  </div>
                  <div className="post-interaction">
                    <i className="fa-regular fa-comment fa-xl"></i>
                    <p>4</p>
                  </div>
                </div>

                <div className="post-interaction">
                  <i className="fa-regular fa-bookmark"></i>
                </div>
              </div>
            </div>
          </div>
        );
      })
  );
}

export default Posts;
