import React from 'react';
import { InputGroup, Modal, Alert, Button, Form, ToggleButtonGroup } from 'react-bootstrap';

class RentRequestModal extends React.Component {
    state = {
        currentUser: localStorage.token ? JSON.parse(localStorage.user) : null,
        author: this.props.place.author,
        displayWarning: false,
        message: "",
        success: false
    }
    componentDidMount() {
        let { currentUser, author } = this.state;

        // user is not logged in
        if (!currentUser) {
            window.location = '/register'
            return
        }

        if (author._id.toString() == currentUser._id.toString()) {
            this.setState({ displayWarning: true })
        }

    }

    requestRental = async () => {
        let url = 'http://localhost:4000/api/user/rent/request/'
        if (this.state.message.length < 10) {
            return;
        }
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({
                placeID: this.props.place._id,
                message: this.state.message
            })
        })
            .then((response) => { console.log(response); return response.json(); })
            .then((res) => {

                console.log(res)
                if (res.success) {
                    this.setState({ success: true })
                    setTimeout(() => {
                        this.props.onHide();
                    }, 1000);
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
        console.log("MODAL ", this.props)
        return (
            <Modal
                show={this.props.show}
                onHide={() => this.props.onHide()}
                centered
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title as='h5' id="add-address">Rental Request for "{this.props.place && this.props.place.title}"
					</Modal.Title>
                </Modal.Header>
                {this.state.displayWarning ?
                    <Alert className="alert alert-danger" role="alert" style={{ textAlign: 'center', margin: '15px' }}>
                        You cannot rent your own property!
					</Alert>
                    :
                    <>
                        <Modal.Body>
                            <Form>
                                <div className="form-row">
                                    <Form.Group className="col-md-12">
                                        <Form.Label>Message</Form.Label>
                                        <InputGroup>
                                            <textarea class="form-control" type="text" onChange={e => this.setState({ message: e.target.value })} placeholder="eg. I'm interested in renting this property, can we arrange a meeting over the phone?" ></textarea>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </Form>
                        </Modal.Body>
                        {this.state.message.length < 10 &&
                            <Alert className="alert alert-danger" role="alert" style={{ textAlign: 'center', margin: '15px' }}>
                                Your message should contain atleast 10 characters.
					</Alert>
                        }

                        {this.state.success &&
                            <Alert className="alert alert-success" role="alert" style={{ textAlign: 'center', margin: '15px' }}>
                                Your rental request has been sent successfully, Thank you!
                                </Alert>
                        }
                        <Modal.Footer>
                            <Button type='button' onClick={() => this.props.onHide()} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
                            <Button type='button' variant="primary" className='d-flex w-50 text-center justify-content-center' onClick={this.requestRental}>SUBMIT</Button>
                        </Modal.Footer>
                    </>
                }

            </Modal>
        );
    }
}
export default RentRequestModal