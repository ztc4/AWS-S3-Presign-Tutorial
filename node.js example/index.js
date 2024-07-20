require("dotenv").config();
const express = require("express");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // Framework that allows access to aws services
const cors = require("cors"); // allows two servers to communicate | usually not needed in springboot

const app = express(); //starting server up
const port = 4000; // http://localhost:4000

app.use(cors());
app.use(express.json());

// Connecting your s3 bucket based off information
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

//
async function getUrl(type, key) {
  const imageContent = "." + type.replace("image/", "");
  

  // Bucket Information
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key + imageContent, //  Image name its stored under in bucket
    // ACL: "public-read",
    ContentType: type, // Image type
  };

  const command = new PutObjectCommand(params);

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL", error);
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server is currently available on http://localhost:${port}`);
}); //Start up the server

app.get("/", async (req, res) => {
  res.status(200).send("Hello this is the place");
});

// URL TO GET IMAGE DETAILS FROM USER THEN RETURN AWS KEY
app.post("/presignedurl", async (req, res) => {
  console.log("End point reached");
  console.log(req.body)
  try {
    let uploadUrl = await getUrl(req.body.type, Math.floor(Math.random() *100000) );
    if (uploadUrl == null) {
      res.status(400).send("Problem getting the presigned signature");
    }
    console.log(uploadUrl);
    res.status(200).send(uploadUrl);
  } catch (e) {
    console.log("error", e);
    res.status(400).send("error");
  }
});
