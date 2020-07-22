import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';
import moment from 'moment';

class CardItem extends React.Component {
	state = {
		message: ""
	}

	remove = async () => {
		let url = 'http://localhost:4000/api/place/' + this.props.list._id
		await fetch(url, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
					this.setState({ message: `"${this.props.list.title}" has been removed successfully!` })
					setTimeout(() => {
						window.location.reload()
					}, 1000);
				}
				console.log(json)
			})
			.catch(err => console.log(err))
	}
	render() {
		let list = this.props.list;
		let id = list._id
		let author = list.author
		let price = list.price
		let date = list.createdAt
		let title = list.title
		let isAvailable = list.isAvailable
		let residents = list.residents
		let subTitle = list.areaName
		let description = list.description
		let residents_available = []
		let residents_current = []
		let rentalRequestsLength = list.rentalRequests.length

		let diff = residents.maximum - residents.current
		for (let i = 0; i < residents.maximum - diff; i++) {
			residents_current.push(0)
		}
		for (let i = 0; i < diff; i++) {
			residents_available.push(0)
		}
		return (
			<>
				<div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
					<div className="list-card-image">
						{/* {this.props.rating ? (
						<div className="star position-absolute">
							<Badge variant="success">
								<Icofont icon='star' /> {this.props.rating}
							</Badge>
						</div>
					)
						: ""
					} */}
						{/* <div className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}>
						<Link to={this.props.linkUrl}>
							<Icofont icon='heart' />
						</Link>
					</div> */}
						{!isAvailable ? (
							<div className="member-plan position-absolute">
								<Badge variant={this.props.promotedVariant}>Unavailable</Badge>
							</div>
						)
							: ""
						}
						<Link to={`/detail?${id}`}>
							<Image src={list.images[0] !== undefined ? list.images[0] : this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} />
						</Link>
					</div>
					<div className="p-3 position-relative">
						<div className="list-card-body">

							<h6 className="mb-1">
								<p className="text-gray mb-3 time">
									<Link to={this.props.linkUrl} className="text-black">{title}</Link>
									{price ? (
										<span className="float-right text-black-50">{price.amount} {price.currency}/Month</span>
									)
										: ""
									}
								</p>
							</h6>
							{subTitle ? (
								<p className="text-gray mb-3"><Icofont icon="location-pin" />{subTitle}</p>
							)
								: ''
							}
							<p>
								{description}
							</p>
							<div class="available-slots">
								{residents_current.map(x => {
									return <img class="user-icon" src="img/user-black.svg" />
								})}
								{residents_available.map(x => {
									return <img class="user-icon" src="img/user-white.svg" />
								})}
								({(residents_current.length) + "/" + residents.maximum})
							</div>

							<div class="buttons">
								<div class="mt-3 mb-3">
									<Icofont icon="clock-time" />   {`  ${moment(date, "DD-MM-YYYY hh:mm:ss A").fromNow()}`}
									<br />
									<p style={{ color: 'black' }}><Icofont icon="icofont-user-alt-7" />{`  ${author.username}`}</p>
								</div>
								{this.props.isRentButton == true && <Button variant="outline-secondary" onClick={this.props.onRentClick} type="button" id="button-1"><Icofont icon="ui-contact-list" /> Rent</Button>}
								{this.props.isShowRequestsButton == true && <Button variant="outline-info" onClick={() => window.location = '/myaccount/seller/requests/?' + id} type="button" id="button-1" style={{ marginRight: '2%', width: '49%' }}><Icofont icon="list" /> Requests ({rentalRequestsLength})</Button>}
								{this.props.isEditButton == true && <Button variant="outline-secondary" type="button" id="button-1" style={{ width: '49%' }} onClick={() => window.location = '/myaccount/seller/edit/?' + id}><Icofont icon="list" /> Edit</Button>}
								{this.props.isDeleteButton == true && <Button variant="outline-danger" onClick={this.remove} type="button" id="button-1" style={{ marginTop: 5, width: '100%' }}><Icofont icon="icofont-ui-delete" /> Remove</Button>}

								{this.props.isShowRequestsButton !== true && <Button style={{ width: (this.props.isRentButton == false && this.props.isEditButton == false) ? '100%' : '50%' }} onClick={() => window.location = `/mapfs/?${list.location.lat}:${list.location.lng}`} variant="outline-secondary" type="button" id="button-2">
									<span className="icofont-map-pins" style={{ fontSize: 22, marginRight: 3 }} />
									Directions</Button>}
							</div>
						</div>

						{/* {this.props.offerText ? (
						<div className="list-card-badge">
							<Badge variant={this.props.offerColor}>OFFER</Badge> <small>{this.props.offerText}</small>
						</div>
					)
						: ""
					} */}
					</div>

				</div>
				{this.state.message.length > 0 &&
					<div className="alert alert-success" role="alert">
						{this.state.message}
					</div>
				}
			</>
		);
	}
}


// CardItem.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	imageAlt: PropTypes.string,
// 	image: PropTypes.string.isRequired,
// 	imageClass: PropTypes.string,
// 	linkUrl: PropTypes.string.isRequired,
// 	offerText: PropTypes.string,
// 	offerColor: PropTypes.string,
// 	subTitle: PropTypes.string,
// 	time: PropTypes.string,
// 	price: PropTypes.string,
// 	showPromoted: PropTypes.bool,
// 	promotedVariant: PropTypes.string,
// 	favIcoIconColor: PropTypes.string,
// 	rating: PropTypes.string,
// };
// CardItem.defaultProps = {
// 	imageAlt: '',
// 	imageClass: '',
// 	offerText: '',
// 	offerColor: 'success',
// 	subTitle: '',
// 	time: '',
// 	price: '',
// 	showPromoted: false,
// 	promotedVariant: 'dark',
// 	favIcoIconColor: '',
// 	rating: '',
// }

export default CardItem;