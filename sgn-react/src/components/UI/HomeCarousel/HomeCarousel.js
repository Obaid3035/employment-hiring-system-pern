import React from 'react';
import {Carousel} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {data} from './home_img'
import './HomeCarousel.css'
import IntlMessages from '../../../Util/IntlMessages';

const HomeCarousel = () => {
	return (
		<Carousel controls={true} indicators={false} interval={2000} pause={'hover'} fade={true}>
			{
				data.map((data,index) => (
					<Carousel.Item key={index}>
						<img
							className="d-block w-100"
							src={data.img}
							alt="First slide"
						/>
						<Carousel.Caption className={'h-100 align-items-center d-flex'}>
							<div className={data.css}>
								<h1 >{ data.text }</h1>
								<NavLink to={'/questionare'}><button className={'btn btn-warning btn-sm quote-btn'}><IntlMessages id="geta_quote" /></button></NavLink>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				))
			}
		</Carousel>

	);
};

export default HomeCarousel;


// indicators={false} interval={2000} pause={'hover'} fade={false}