import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import style from './style.module.scss';
import PropTypes from "prop-types";

const PostSwiper = ({imageUrls}) => {
    return (
        <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className={style.swiper}
        >
            {imageUrls.map((url, index) => (
                <SwiperSlide
                    key={index}
                    className={style.swiperSlideWrapper}
                    style={{backgroundImage: `url(${url})`}}
                />
            ))}
        </Swiper>
    );
};

PostSwiper.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string)
};

export default PostSwiper;
