import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, Image, Badge } from 'react-bootstrap';
import Icofont from 'react-icofont';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { mapbox_token } from "../../config.json"
import RentalRequestModal from '../modals/RentalRequestModal'

class DemoCarousel extends React.Component {
	render() {
		return (
			<Carousel>
				<div>
					<img src="/img/gallery/1.png" />
				</div>
				<div>
					<img src="/img/gallery/2.png" />
				</div>
				<div>
					<img src="/img/gallery/3.png" />
				</div>
			</Carousel>
		);
	}
};
class Detail extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			details: {},
			show: false
		};
	}

	async componentDidMount() {
		mapboxgl.accessToken = mapbox_token
		let url = 'http://localhost:4000/api/place/' + window.location.search.replace("?", "")
		await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			cache: "no-cache",
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.token
			}
		})
			.then(response => response.json())
			.then(json => {
				if (json.success) {
					let details = json.data
					this.setState({ details })
					console.log(details.location)
					let map = new mapboxgl.Map({
						container: 'map',
						style: 'mapbox://styles/mapbox/streets-v9',
						zoom: 9,
						center: [details.location.lng, details.location.lat]
					});
					console.log(map)
					new mapboxgl.Marker()
						.setLngLat([details.location.lng, details.location.lat])
						.addTo(map);
					map.addControl(new mapboxgl.FullscreenControl());

				}

				// map.addControl(
				// 	new MapboxGeocoder({
				// 		accessToken: mapboxgl.accessToken,
				// 		mapboxgl
				// 	})
				// );
				console.log(json)
			})
			.catch(err => console.log(err))
	}

	render() {
		let { details } = this.state

		return (
			<>
				<section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4" style={{ margin: 'auto' }}>
					{this.state.show && <RentalRequestModal show={this.state.show} place={details} onHide={(response) => this.setState({ show: false })} />}

					<div style={{ marginLeft: '5%', marginRight: '5%' }}>
						<h2>{details.title}</h2>
						<Row>
							<Col md={12}>
								<div className="offer-dedicated-body-left">
									<div className='h-100'>
										<div className='position-relative'>
											<div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
												<Row>
													<div class="col-6">
														<Carousel>
															{details.images && details.images.map(url=>(
																<div>
																	<img src={url}/>
																</div>
															))}
														</Carousel>
													</div>
													<div class="col-6">
														<label style={{ fontSize: '1.2rem' }}>Information</label>
														<table style={{
															"width": "100%",
															borderCollapse: "collapse"
														}}>
															<tr>
																<th style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px'
																}}>Price</th>
																<th style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px'
																}}>Targeted Customers</th>
																<th style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px'
																}}>Current Residents</th>
																<th style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px'
																}}>Available Slots</th>
															</tr>
															<tr>
																<td style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px',
																	textAlign: 'center'
																}}>{!!details.price && '  ' + details.price.amount} {!!details.price && details.price.currency}/Month</td>
																<td style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px',
																	textAlign: 'center'
																}}>{details.type}s</td>
																<td style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px',
																	textAlign: 'center'
																}}>{details.residents && details.residents.current}</td>
																<td style={{
																	border: '1px solid #dddddd',
																	textAlign: 'left',
																	padding: '8px',
																	textAlign: 'center'
																}}>{details.residents && details.residents.maximum - details.residents.current}</td>
															</tr>
														</table>
														<hr />
														<div className="mb-3">
															<label style={{ fontSize: '1.2rem' }}>Features</label>
															<table style={{
																"width": "100%",
																borderCollapse: "collapse"
															}}>
																<tr>
																	<th style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px'
																	}}>Furnished</th>
																	<th style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px'
																	}}>Bed Rooms</th>
																	<th style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px'
																	}}>Bath Rooms</th>
																	<th style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px'
																	}}>Area Measurement</th>
																</tr>
																<tr>
																	<td style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px',
																		textAlign: 'center'
																	}}>{!!details.filters && details.filters.isFurnished ? ' Yes' : ' No'}</td>
																	<td style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px',
																		textAlign: 'center'

																	}}>{!!details.filters && '  ' + details.filters.bedrooms}</td>
																	<td style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px',
																		textAlign: 'center'
																	}}>{!!details.filters && details.filters.bathrooms}</td>
																	<td style={{
																		border: '1px solid #dddddd',
																		textAlign: 'left',
																		padding: '8px',
																		textAlign: 'center'
																	}}>{!!details.filters && details.filters.areaM2} (m^2)</td>
																</tr>
															</table>
														</div>

														<div>
															<label style={{ fontSize: '1.2rem' }}>Description</label>
															<p className="mb-3" style={{ overflowWrap: 'break-word' }}>
																{details.description}
															</p>
														</div>
														<hr className="clearfix" />
														<div>
															<div className="address-map">
																<p>
																	<Icofont icon="google-map" />
																	{details.areaName}
																</p>
																<div id='map' style={{ width: "900px", height: "300px", selfAlign: 'center' }}></ div>
																{/* <div className="mapouter">
																	<div className="gmap_canvas">
																		<iframe title='addressMap' width="300" height="170" id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div>
																</div> */}
															</div>
															<Button variant="outline-success" className="col-3" style={{ marginTop: '25px' }} onClick={() => this.setState({ show: true })} type="button" id="button-1"><Icofont icon="ui-contact-list" /> Rent</Button>
														</div>


													</div>
												</Row>

											</div>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</section>

			</>
		);
	}
}


export default Detail;