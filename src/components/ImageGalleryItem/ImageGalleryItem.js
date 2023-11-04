import { ImageWrapper } from "./ImageGalleryItem.styled"
import { ModalWindow } from "components/Modal/Modal";
import { useState } from "react";

export const ImageGalleryItem = ({ web, alt, full }) => {
    const [isModalOpen, setModalStatus] = useState(false);
    const toggleModal = () => {
       setModalStatus(prevState => !prevState)
    }
      return (
        <ImageWrapper onClick={toggleModal}>
            <img src={web} alt={alt} width="360" />
              <ModalWindow isShow={isModalOpen}
                  close={toggleModal}
                  url={full}
                  alt={alt}/>
        </ImageWrapper>
    )
}

