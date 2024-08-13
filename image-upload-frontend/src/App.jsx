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
    console.log("No image uploaded");
    return;
  }

  // Get Format of Image - jpg, svg, png, webp
  const type = `${image.type}`;
  console.log(1, type);

  try {
    // Get the presigned URL
    const response = await axios.post('http://localhost:8080/presignedurl', { type: type });
    const url = response.data;

    console.log(1, url);
    console.log(1, typeof url);

    // Upload the image to S3
    await axios.put(
      url, // URL to bucket obtained from the backend
      image, // Image you want to upload
      { headers: { "Content-Type": type /* Image type - webp, png, jpg... */ } }
    );

    console.log("Successfully uploaded!");
  } catch (error) {
    console.error("Error during upload:", error);
  }
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
