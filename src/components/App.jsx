import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import toast, { Toaster } from 'react-hot-toast';
import { fetchColletion, perPage } from "./api";
import { Loader } from "./Loader/Loader";




const notify = () => toast('Sorry, there is`n photo for your request',{
  style: {
     background: 'red',
  },
});



export const App = () => {
  const [request, setRequest] = useState('');
  const [collection, setCollection] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoadingStatus] = useState(false);
  const [showBtn, setBtnStatus] = useState(false);


  useEffect(() => {
    const data = {
        page: page,
        query: request
    }
      async function asyncFetch() {
      setLoadingStatus(true);
      try {
              const result = await fetchColletion(data)
              const hits = result.hits;
              const totalHits = result.totalHits;
              if (hits.length === 0) {
                notify()
              } else {
                updateCollection(hits);
                  setBtnStatus(page<Math.ceil(totalHits/perPage) ? true : false)
              }
            } catch (err) {
              alert(err)
            } finally {
              setLoadingStatus(false);
            }
      }
    if (request!=="") {
      asyncFetch();
    }
  }, [page, request])
  
  const updateCollection = (hits) => {
    setCollection([...collection, ...hits])
  } 

  const takeRequest = (req) => {
    setRequest(req);
    setCollection([]);
    setPage(1);
  }

  const nextPage = () => {
     setPage(prevState => ( prevState + 1 ))
  }
  
  return (
        <>
          <Searchbar onSubmit={takeRequest} />
          <Toaster />
          {collection.length ?
            <>
              <ImageGallery collection={collection} />
              {showBtn ?
                <Button handleClick={nextPage} />
                : null
              }
            </>
            : null
          }
          {isLoading ?
            <Loader /> : null}
        </>
  )
}
