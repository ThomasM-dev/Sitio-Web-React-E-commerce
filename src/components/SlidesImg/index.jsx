import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../GlobalState/productSlice';
import { useGetProductsQuery } from '../../GlobalState/productsApi';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './SliderImg.css'; // Archivo CSS para los estilos personalizados

const SliderImg = () => {
    const { data } = useGetProductsQuery();
    const productsImg = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setProducts(data));
        }
    }, [data, dispatch]);

    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 4, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        enterMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {productsImg.map((product, index) => (
                    <div key={index} className="slider-item">
                        <img
                            src={product.imageUrl}
                            alt={`product-${index}`}
                            className="slider-img"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderImg;
