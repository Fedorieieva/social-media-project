import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import style from './style.module.scss';
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "../../atoms/Modal/index.js";
import ImageUpload from "../../molecules/ImageUpload/ImageUpload.jsx";

const ImageUploadModal = ({onClose}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.overflow = 'unset';
        }
    }, []);

    return ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
            <ModalHeader>
                <ModalClose onClick={onClose}/>
            </ModalHeader>

            <ModalBody>
                <ImageUpload/>
            </ModalBody>
        </ModalWrapper>,
        document.body
    );
};

export default ImageUploadModal