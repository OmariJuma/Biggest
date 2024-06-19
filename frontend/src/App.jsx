import './App.css'
import DisplayAdverts from './Components/DisplayAdverts';
import ImageContainer from './Components/ImageContainer';
import NavBar from './Components/NavBar'
import "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
  return (<>
    <NavBar/>
    <ImageContainer/>
   <DisplayAdverts/>
  </>
  )
}

export default App
