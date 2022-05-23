import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function App() {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");

  function loadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  function uploadImage() {
    const dataForm = new FormData();
    for (const file of files) {
      dataForm.append("file", file);
    }

    const promise = axios.post("http://localhost:5000/upload", dataForm);
    promise.then((response) => console.log(response.data));
    promise.catch((error) => console.log(error.response));
  }

  console.log(files);
  return (
    <BodyContainer image={image}>
      <UploadContainer>
        <h1>Escolha uma imagem para o plano de Fundo</h1>
        <label htmlFor="files">Escolha um arquivo</label>
        <input
          type="file"
          id="files"
          name="files"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            console.log(event.target.files);
            loadImage(event.target.files[0]);
            setFiles([...event.target.files]);
          }}
        />
        <button onClick={uploadImage}>Upload</button>
      </UploadContainer>
    </BodyContainer>
  );
}

const BodyContainer = styled.div`
  width: 90vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => (props.image ? `url(${props.image})` : "")};
  background-size: cover;
`;

const UploadContainer = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid gray;
  border-radius: 20px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    text-align: center;
    height: 40px;
    background-color: lightblue;
    border-radius: 10px;
    margin-bottom: 40px;
  }

  h1 {
    text-align: center;
  }
`;
