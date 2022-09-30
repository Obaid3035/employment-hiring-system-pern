import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import logo1 from '../../../assets/img/logo1.png'
import logo2 from '../../../assets/img/logo2.png'
import logo3 from '../../../assets/img/logo3.png'
import logo4 from '../../../assets/img/logo4.png'
import logo5 from '../../../assets/img/logo5.png'



import './OwlCarousel.css'

const CustomCarousel = ( props ) => {
    const responsiveClass =  {
            0: {
                items: 1,
            },

            100: {
                items: 2,
            },

            1024: {
                items: 4,
            },

            1366: {
                items: 5,
            },
        }
    return (
        <OwlCarousel className='owl-theme text-center'
                     loop responsive={responsiveClass} responsiveClass={true}
                     margin={50}  autoplayTimeout={1000} autoplay={true} smartSpeed={800}>
            <div>
                <img className={'img-fluid'} src={logo1} alt=""/>
            </div>
            <div>
                <img className={'img-fluid'} src={logo2} alt=""/>
            </div>
            <div>
                <img className={'img-fluid'} src={logo3} alt=""/>
            </div>
            <div>
                <img className={'img-fluid'} src={logo4} alt=""/>
            </div>
            <div>
                <img className={'img-fluid'} src={logo5} alt=""/>
            </div>
        </OwlCarousel>
    );
}

export default CustomCarousel;
