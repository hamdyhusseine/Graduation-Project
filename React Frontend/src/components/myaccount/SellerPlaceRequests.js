import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import CardItem from '../common/CardItem';

class SellerPlaceRequests extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            list: {},
            isLoading: true,
            placeID: window.location.search.replace("?", ""),
            message: ""
        };
    }

    async componentDidMount() {
        await this.fetchPlace()
    }
    async fetchPlace() {
        let url = 'http://localhost:4000/api/place/' + this.state.placeID
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
                console.log(json)
                this.setState({ list: json.data, isLoading: false })
                // this.setState({ listing: json.data, isLoading: false })
            })
            .catch(err => console.log(err))
    }
    async decision(id, type) {
        if (type !== '' && id !== '') {
            await fetch('http://localhost:4000/api/place/rent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ userID: id, placeID: this.state.placeID, decision: type })
            })
                .then((response) => { console.log(response); return response.json(); })
                .then(async (res) => {
                    if (res.success) {
                        console.log('Success:', res);
                        if (type === true) {
                            this.setState({ message: "The request has been approved!" })
                        } else {
                            this.setState({ message: "The request has been rejected!" })
                        }
                        setTimeout(async () => {
                            this.setState({ message: "" })
                            await this.fetchPlace()
                        }, 1200);
                    }
                })
                .catch((error) => {
                    this.setState({
                        error: true,
                    })
                    console.error('Error:', error);
                });
        }
    }

    render() {
        let list = this.state.list
        console.log(list)
        return (
            <>
                <Col md={9} style={{ margin: 'auto', marginTop: 20 }}>

                    <div className='p-4 bg-white shadow-sm'>
                        <Row>
                            <Col md={8}>
                                <h4 className="font-weight-bold mt-0 mb-3">Rental Requests for ({list.title})</h4>
                            </Col>
                            <Col md={12} sm={12} className="mb-4 pb-2">
                                <Col lg={12} md={12} sm={12} style={{ margin: 'auto', maxWidth: '930px' }} className="mb-4 pb-2">
                                    {this.state.isLoading == false &&
                                        <>
                                            <p style={{ fontSize: 20 }}>Property details</p>
                                            <CardItem
                                                list={list}
                                                rentalRequestsButtonClick={() => this.setState({ post: list, showPostRequests: true })}
                                                isRentButton={false}
                                                isEditButton={true}
                                                imageAlt='Product'
                                                image='img/list/1.png'
                                                imageClass='img-fluid item-img'
                                                promotedVariant='dark'
                                                favIcoIconColor='text-danger'
                                            />
                                            <p style={{ fontSize: 20, marginTop: 15 }}>Requests</p>
                                            {list.rentalRequests.length < 1 &&
                                                <div className="alert alert-info" role="alert">
                                                    There are no rental requests for this property yet
                                                </div>
                                            }
                                            {list.rentalRequests.map(request => (
                                                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm" style={{ padding: '30px', marginTop: '15px' }}>
                                                    <div class="position-relative" style={{ width: '100%' }}>
                                                        <div class="list-card-body">
                                                            <h6 class="mb-1">
                                                                <p class="text-gray mb-3 time"><span class="text-black" style={{ fontSize: '1.6rem' }}>{request.renterID.username}</span><span class="float-right text-black" style={{ fontSize: '1.6rem' }}>
                                                                    {/* {request.phone} */}
                                                                </span></p>
                                                            </h6>
                                                            <p class="text-gray mb-3" style={{ fontSize: '1rem' }}><i class="icofont-location-pin"></i>{!request.renterID.address ? "Not provided" : request.renterID.address}</p>
                                                            <p class="text-gray mb-3" style={{ fontSize: '1rem' }}><i class="icofont-phone"></i>{request.renterID.phone}</p>
                                                            <p class="text-gray mb-3" style={{ fontSize: '1rem' }}>{request.message}</p>
                                                            <div class="mt-5 buttons">
                                                                <button id="button-1" type="button" class="btn btn-outline-success" onClick={() => this.decision(request.renterID._id, true)}>
                                                                    Approve
                                                      </button>
                                                                <button id="button-2" type="button" class="btn btn-outline-danger" onClick={() => this.decision(request.renterID._id, false)}>
                                                                    Reject
                                                         </button>
                                                            </div>
                                                            <small style={{ marginTop: 5 }}>Please call the person first to arrange a meeting before making a decision</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {this.state.message.length > 0 &&
                                                <div className="alert alert-success" role="alert">
                                                    {this.state.message}
                                                </div>
                                            }
                                        </>
                                    }
                                </Col>

                            </Col>
                        </Row>
                    </div>
                </Col>

            </>
        );
    }
}
export default SellerPlaceRequests;