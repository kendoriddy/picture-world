import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center me-auto mt-32">No Images Found</h1>}

      {isLoading ? <h1 className="text-6xl text-center me-auto mt-32">Loading...</h1> : <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={images.id} image={image} />
        ))}
      </div>}

      <Footer />
    </div>
  );
}

export default App;
