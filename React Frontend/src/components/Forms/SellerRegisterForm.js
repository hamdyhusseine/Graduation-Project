import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';

class SellerRegisterForm extends React.Component {
    state = {
        office: '',
        socialLink: '',
        error: false,
        success: false,
        isRemember: false,
        SuccessMessage: false
    }

    Register = async (e) => {
        e.preventDefault()
        console.log(this.state)
        let data = {
            address: this.state.office,
            socialLink: this.state.socialLink
        }
        if (data.socialLink == '') {
            this.setState({
                error: true
            })
            return
        }
        if (this.state.isRemember) {
            localStorage.setItem('rememberUser', JSON.stringify(data))
        }
        await fetch('http://localhost:4000/api/user/apply/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify(data),
        })
            .then((response) => { console.log(response); return response.json(); })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    this.setState({
                        error: false,
                        success: true,
                        SuccessMessage: "Thanks for your submission, we will contact you soon"
                    })
                    console.log('Success:', res);

                    // set status to pending for this session
                    let newUser = { ...JSON.parse(localStorage.user), status: "pending" }
                    localStorage.user = JSON.stringify(newUser)
                    window.location = '/myaccount/rentals'
                } else {
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
                    console.log('Error : ', res)
                }
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
                console.error('Error:', error);
            });
    }
    render() {
        return (
            <Container fluid className='bg-white'>
                <Row>
                    <Col md={8} lg={6} style={{ margin: 'auto' }}>
                        <div className="login d-flex align-items-center py-5">
                            <Container style={{ height: 600 }}>
                                <Row>
                                    <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                                        <h3 className="login-heading mb-4">Become an Agent</h3>
                                        <form onSubmit={this.Register}>
                                            <div className="form-label-group">
                                                <Form.Control type="text" id="socialLink" value={this.state.socialLink} onChange={e => this.setState({ socialLink: e.target.value })} placeholder="(eg. Branded Website, Facebook Page, Twitter Account)" />
                                                <Form.Label htmlFor="socialLink">Online Presence * </Form.Label>
                                            </div>
                                            <div className="form-label-group">
                                                <Form.Control type="text" id="inputoffice" value={this.state.office} onChange={e => this.setState({ office: e.target.value })} placeholder="office" />
                                                <Form.Label htmlFor="inputoffice">Office Address</Form.Label>
                                            </div>

                                            <button className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" style={{ color: 'white' }}>Apply</button>
                                            {this.state.error && <Alert className="alert alert-danger" style={{ marginTop: '5px' }} role="alert">{this.state.errorMessage}</Alert>}
                                            {this.state.success && <Alert className="alert alert-success" style={{ marginTop: '5px' }} role="alert">{this.state.SuccessMessage}</Alert>}
                                        </form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default SellerRegisterForm;