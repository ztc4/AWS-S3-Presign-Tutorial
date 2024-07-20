import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios"


function App() {

  const [image, setImage] = useState(null);

  // Add Image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    
  };
// Upload Your Image
  const handleUpload = async () => {
    if (image == null) {
      return console.log("no image uploaded");
    }

    // Get Format of Image - jpg, svg, png, webp
    let type = `${image.type}`; 
    console.log(1,type)
 
    // Get the presigned URL
    const url = await axios    
      .post(`http://localhost:8080/presignedurl`, { type: type }) 
      .then((res) => res.data);
      console.log(1,url)

      console.log(1,typeof url)

    // //Upload the image to S3
    await axios.put(
      url, // url to bucket got it from the backend
      image, // image you want to upload
      {headers: {"Content-Type": type, /* image type - webp, png, jpg...*/},})
      .then((res) => {console.log(res);console.log("successfilly added!");}) // Console log if iamge successfully uploaded
      .catch((error) => console.log(error)); // log error if image wasn't uploaded



  };

  return (
    <div className="form">
      <h1>Upload Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange}/>
      <button onClick={handleUpload}>Add Image to S3</button>
    </div>
  );
}

export default App;
