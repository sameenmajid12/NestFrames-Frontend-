function PhotosContent(){
  const photos = [
    {
      imgSrc : "./assets/Screenshot 2024-07-31 025337.png"
    },
    {
      imgSrc : "./assets/Screenshot 2024-07-31 025422.png"
    },
    {
      imgSrc : "./assets/Screenshot 2024-07-31 025511.png"
    },
    {
      imgSrc : "./assets/Screenshot 2024-07-31 025658.png"
    },
    {
      imgSrc: "./assets/Screenshot 2024-07-31 025724.png"
    },
    {
      imgSrc: "./assets/Screenshot 2024-07-31 025753.png"
    }
  ]
  return(
    <div className="photos-container">
      {photos.map((photo, index)=>{
        return(<div key={index}>
          <img className="photos" src={photo.imgSrc}></img>
        </div>)
      })}
    </div>
  );
}
export default PhotosContent;