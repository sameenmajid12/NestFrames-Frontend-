import { Link } from "react-router-dom";

function NotFound(){
  return(
    <>
      <div>404 not found</div>
      <Link to="/">Back to Home</Link>
      <a href="/">Back to home from a</a>
    </>
    
  )
}
export default NotFound;