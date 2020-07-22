import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form } from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';


class TopSearch extends React.Component {
	state = {
		query: '',
	}
	render() {
		return (
			<section className="pt-5 pb-5 homepage-search-block position-relative">
				<div className="banner-overlay"></div>
				<Container>
					<Row className="d-flex align-items-center">
						<Col md={12}>
							<div className="homepage-search-title">
								<h1 className="mb-2 font-weight-normal"><span className="font-weight-bold">Find Rental Apartments</span> in Egypt</h1>
								<h5 className="mb-5 text-secondary font-weight-normal">Lists of the best rental apartments in Egypt posted by verified agents</h5>
							</div>
							<div className="homepage-search-form">
								<Form className="form-noborder" onSubmit={e => {
									e.preventDefault();
									this.props.searchThroughAds(this.state.query)
								}}>
									<div className="form-row">
										<Form.Group className='col-lg-2 col-md-2 col-sm-12'>
											<div className="location-dropdown">
												<Select2 className="custom-select"
													data={[
														{ text: 'General', id: 'general' },
														{ text: 'Student', id: 'student' },
														{ text: 'Employee', id: 'employee' },
													]}
													options={{
														placeholder: 'Status',
													}}
													onChange={e=> this.props.FilterBy(e.target.value)}
												/>
											</div>
										</Form.Group>
										<Form.Group className='col-lg-6 col-md-6 col-sm-12'>
											<Form.Control type="text" placeholder="Search for an apartment.." size='lg' onChange={e => this.setState({ query: e.target.value })} />
										</Form.Group>

										<Form.Group className='col-lg-2 col-md-2 col-sm-12'>
											<Link className="btn btn-primary btn-block btn-lg btn-gradient" onClick={() => this.props.searchThroughAds(this.state.query)}>Search</Link>
										</Form.Group>
									</div>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}

const options2 = {
	responsive: {
		0: {
			items: 2,
		},
		764: {
			items: 2,
		},
		765: {
			items: 1,
		},
		1200: {
			items: 1,
		},
	},
	lazyLoad: true,
	loop: true,
	autoplay: true,
	autoplaySpeed: 1000,
	dots: false,
	autoplayTimeout: 2000,
	nav: true,
	navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
	autoplayHoverPause: true,
}

export default TopSearch;