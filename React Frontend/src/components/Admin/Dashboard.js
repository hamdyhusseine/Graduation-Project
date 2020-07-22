import React from 'react';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, Image, Badge, Alert } from 'react-bootstrap';

class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            requests: []
        };
    }

    async componentDidMount() {
        await this.getAllRequests()
    }
    async getAllRequests() {
        await fetch('http://localhost:4000/api/admin/requests/', {
            method: 'GET',
            mode: 'cors', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
        })
            .then((response) => { console.log(response); return response.json(); })
            .then((res) => {
                if (res.success) {
                    console.log('Success:', res);
                    this.setState({ requests: res.data })
                }
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
                console.error('Error:', error);
            });
    }
    async decision(id, type) {
        if (type !== '' && id !== '') {
            await fetch('http://localhost:4000/api/admin/requests/decision/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ decision: type })
            })
                .then((response) => { console.log(response); return response.json(); })
                .then(async (res) => {
                    if (res.success) {
                        console.log('Success:', res);
                        await this.getAllRequests()
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
        return (
            <>
                <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
                    <Container>
                        <h2 style={{ textAlign: 'center' }}>Agents Applicants</h2>
                        <Row style={{ padding: 15 }}>
                            <Col md={6} style={{ margin: 'auto' }}>
                                <div className="offer-dedicated-body-left">
                                    <div className='h-100'>
                                        <div className='position-relative'>

                                            {this.state.requests.length < 1 &&

                                                <Alert className="alert alert-primary" role="alert">
                                                    There are no requests at the moment
	                  </Alert>}
                                            {this.state.requests.map(request =>
                                                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm" style={{ padding: '30px', marginTop: '15px' }}>
                                                    <div class="position-relative" style={{ width: '100%' }}>
                                                        <div class="list-card-body">
                                                            <h6 class="mb-1">
                                                                <p class="text-gray mb-3 time"><span class="text-black" style={{ fontSize: '1.6rem' }}>{request.username}</span><span class="float-right text-black" style={{ fontSize: '1.6rem' }}>
                                                                    {/* {request.phone} */}
                                                                </span></p>
                                                            </h6>
                                                            <p class="text-gray mb-3" style={{ fontSize: '1rem' }}><i class="icofont-location-pin"></i>{request.address.length < 1 ? "Not provided" : request.address}</p>
                                                            <p class="text-gray mb-3" style={{ fontSize: '1rem' }}><i class="icofont-phone"></i>{request.phone}</p>
                                                            <a href={request.socialLink} target="_"><i class="icofont-link" style={{ fontSize: '1rem' }}></i>{request.socialLink}</a>
                                                            <div class="mt-5 buttons">
                                                                <button id="button-1" type="button" class="btn btn-outline-success" onClick={() => this.decision(request._id, true)}>
                                                                    Approve
                                                     </button>
                                                                <button id="button-2" type="button" class="btn btn-outline-danger" onClick={() => this.decision(request._id, false)}>
                                                                    Reject
                                                        </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </>
        );
    }
}


export default Dashboard;