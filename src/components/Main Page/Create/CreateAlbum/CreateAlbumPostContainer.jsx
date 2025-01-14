import { useState } from "react";
function CreateAlbumPostContainer({albumPosts}) {
   const [photoCarouselIndex, setPhotoCarouselIndex] = useState(0);
   const handleNextPhoto = () => {
    setPhotoCarouselIndex((prev) => prev + 1);
  };

  const handlePreviousPhoto = () => {
    setPhotoCarouselIndex((prev) => prev - 1);
  };
  return (
    <div className="create-album-photos-container">
      <div className="create-album-photo-upload">
        {albumPosts.length > 0 ? (
          <img src={URL.createObjectURL(albumPosts[0 + photoCarouselIndex].photo)}></img>
        ) : (
          <div className="create-album-photo-plus-container">
            <i
              className="fa-solid fa-plus"
              style={{ color: "white", fontSize: "24px" }}
            ></i>
          </div>
        )}
      </div>
      <div className="create-album-photo-upload">
        {albumPosts.length > 1 ? (
          <img src={URL.createObjectURL(albumPosts[1 + photoCarouselIndex].photo)}></img>
        ) : (
          <div className="create-album-photo-plus-container">
            <i
              className="fa-solid fa-plus"
              style={{ color: "white", fontSize: "24px" }}
            ></i>
          </div>
        )}
      </div>
      <div className="create-album-photo-upload">
        {albumPosts.length > 2 ? (
          <img src={URL.createObjectURL(albumPosts[2 + photoCarouselIndex].photo)}></img>
        ) : (
          <div className="create-album-photo-plus-container">
            <i
              className="fa-solid fa-plus"
              style={{ color: "white", fontSize: "24px" }}
            ></i>
          </div>
        )}
      </div>
      {albumPosts.length > 3 && photoCarouselIndex < albumPosts.length - 3 ? (
        <div onClick={handleNextPhoto} className="create-album-photo-next">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      ) : (
        ""
      )}
      {photoCarouselIndex > 0 ? (
        <div
          onClick={handlePreviousPhoto}
          className="create-album-photo-previous"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateAlbumPostContainer;