function Posts(){
  const posts = [
    {
      profileUsername:'@kristinagutierrez',
      profileImg:'./assets/kristina.jpg',
      imgSrc:'./assets/Screenshot 2024-07-31 025753.png',
      postType:'addedToAlbum',
      postedByFriend:true,
      reactions:[{
        reactUser:'@athenaesposito',
        reactionType:'love',
        reactionComment:'Very cool Post',
        reactionTime:new Date()
      }]

    },{
      profileUsername:'@saragallo26',
      profileImg:'./assets/kristina.jpg',
      postType:'createdAlbum',
      imgSrc:'./assets/Screenshot 2024-07-31 025724.png',
      postedByFriend:false,
      reactions:[{
        reactUser:'@athenaesposito',
        reactionType:'love',
        reactionComment:'Very cool Post',
        reactionTime:new Date()
      }]

    }

  ]
  const postComponent = posts.map((post,index)=>{
    return(<div key={index} className="posts">
      <div className="post-header">
        <div className="post-header-details">
          <img className="user-picture" src={post.profileImg}></img>
          <div className="">
            <p className="user-username">{post.profileUsername}</p>
            {post.postType==='addedToAlbum'?<p>Added a photo to <span className="album-name">Summer 2024</span></p>:<p>Created a new Album <span className="album-name"> Summer 2024</span></p>}
          </div>
        </div>  
        <div className="post-header-right">
          {post.postedByFriend?<button className="posted-by-friend">Friend</button>:<button className="not-posted-by-friend">Add</button>}
          <div className="ellipsis">
            <i className="fa-solid fa-ellipsis  fa-xl" style={{color:"#444"}}></i>
          </div>
          
        </div>
      </div>
      <div className="post-content">
        <div className="post-image">
          <img src={post.imgSrc}></img>
          <div className="post-interaction-container">
            <div className="post-interaction">
              <i className="fa-solid fa-heart fa-xl" style={{color:"white"}}></i>
              <p>React</p>
            </div>
            <div className="post-interaction">
              <i className="fa-solid fa-comment fa-xl" style={{color: "#ffffff"}}></i>
              <p>Comment</p>
            </div>
            <div className="post-interaction">
              <i className="fa-solid fa-arrow-up-from-bracket fa-xl" style={{color: "#ffffff"}}></i>
              <p>Share</p>
            </div>
            
            
          </div>
        </div>
      </div>
      <div className="post-reactions">

        </div>
        <hr></hr>
    </div>)
  });
  return(
    <div>{postComponent}</div>
  )
}

export default Posts;