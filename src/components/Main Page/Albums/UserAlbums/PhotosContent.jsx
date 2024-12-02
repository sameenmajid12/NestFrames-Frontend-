import { useOutletContext } from "react-router-dom";
function PhotosContent(){
    const {photos} = useOutletContext();
  return(
    <div className="photos-container">
      {photos.map((photo, index)=>{
        console.log(photo)
        return(<div key={index}>
          <img className="photos" src={photo}></img>
        </div>)
      })}
    </div>
  );
}
export default PhotosContent;