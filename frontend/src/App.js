import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

// if in process.env have API_URL or if not use local host
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.11:5050'

function App() {

  const [word, setWord] = useState('');
  const [images,setImages] = useState([]);
  console.log(images);

  const handleSearchSubmit = (e) =>{
    e.preventDefault();
    console.log(word);
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res)=>res.json())
      .then((data)=>{
        setImages([{...data,title:word},...images])
      })
      .catch((err)=>{
        console.log(err);
      })
    setWord('');
  }

  const handleDeleteImage = (id) =>{
    setImages(images.filter((image) => image.id !== id))
  };

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord = {setWord} handleSubmit={handleSearchSubmit}/>
      <Container className='mt-4'>
        {images.length ? (
        <Row xs={1} md={2} lg={4}> 
        {images.map((image, i) => (<Col key={i} className='pb-3'><ImageCard image={image} deleteImage={handleDeleteImage}/></Col>))}    
        </Row>
        ) : (
        <Welcome />
        )}    
      </Container>
    </div>
  );
}

export default App;
