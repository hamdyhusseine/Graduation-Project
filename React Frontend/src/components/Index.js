import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
import ProductBox from './home/ProductBox';
import CardItem from './common/CardItem';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';

class Index extends React.Component {

	render() {
    	return (
    		<>
    			<TopSearch />
				<section className="section pt-5 pb-5 bg-white homepage-add-section">
					<Container>
						<Row>
						   <Col md={3} xs={6}>
						   	<ProductBox 
						   		image='img/pro1.jpg'
						   		imageClass='img-fluid rounded'
						   		imageAlt='product'
						   		linkUrl='#'
						   	/>
						   </Col>
						   <Col md={3} xs={6}>
						   	<ProductBox 
						   		image='img/2.jpg'
						   		imageClass='img-fluid rounded'
						   		imageAlt='product'
						   		linkUrl='#'
						   	/>
						   </Col>
						   <Col md={3} xs={6}>
						   	<ProductBox 
						   		image='img/pro3.jpg'
						   		imageClass='img-fluid rounded'
						   		imageAlt='product'
						   		linkUrl='#'
						   	/>
						   </Col>
						   <Col md={3} xs={6}>
						   	<ProductBox 
						   		image='img/pro4.jpg'
						   		imageClass='img-fluid rounded'
						   		imageAlt='product'
						   		linkUrl='#'
						   	/>
						   </Col>
						</Row>
					</Container>
				</section>

    		</>
    	);
    }
}


const options={
	responsive: {
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000: {
          items: 4,
        },
        1200: {
          items: 4,
        },
      },

        lazyLoad: true,
        pagination: false.toString(),
        loop: true,
        dots: false,
        autoPlay: 2000,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
}




export default Index;