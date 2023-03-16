import { useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { getImages } from 'servises/GalleryApi';



export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const getImagesArray = async (params) => {
    setIsLoading(true);
    const imagesArray = await getImages(params.query, params.page);
    setImages(params.page > 1 ? [...images, ...imagesArray.hits] : imagesArray.hits);
    setTotalHits(imagesArray.totalHits)
    setIsLoading(false);
  }

  const onSearchBarSubmit = (query) => {
    setQuery(query);
    setPage(1);
    getImagesArray({ query, page: 1 });
  } 

  const onLoadMoreClick = () => {
    const nextPage = page + 1;
    setPage(nextPage)
    getImagesArray({ query, page: nextPage });
    
    
  }
  const onToggleModal = () => {
    setIsOpenModal(prev => !prev);
    

  };
  const onImageClick = img => {
    setModalImage(img);
    setIsOpenModal(true);
  };


  
    // const {totalHits, images, isOpenModal, modalImage} = this.state
    return (
      <>
        <Searchbar onSubmit={onSearchBarSubmit} />
        <ImageGallery
          totalHits={totalHits}
          images={images}
          onLoadMoreClick={onLoadMoreClick}
          onImageClick={onImageClick}
        />
        {isOpenModal && (
          <Modal onToggleModal={onToggleModal}>
            <img src={modalImage} alt='' />
          </Modal>
        )}
      </>
    );
  };

