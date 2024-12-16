import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "../../atoms/Modal/index.js";
import Post from "../Post/Post.jsx";
import style from './style.module.scss';

const PostModal = ({post, onClose}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className={style.modal}
            >
                <ModalHeader>
                    <ModalClose onClick={onClose} className={style.modalClose}/>
                </ModalHeader>

                <ModalBody>
                    <Post post={post}/>
                </ModalBody>
            </div>
        </ModalWrapper>,
        document.body
    );
};

export default PostModal