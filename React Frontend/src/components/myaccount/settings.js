import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // username: '',
            currentPwd: '',
            // newPwd: '',
            // confirmPwd: '',
            message: ''
        };
    }

    save = async () => {
        let url = 'http://localhost:4000/api/user/'
        if ((this.state.newPwd !== this.state.confirmPwd) && this.state.currentPwd.length > 0) {
            this.setState({ message: "Passwords doesn't match" })
            return
        }
        await fetch(url, {
            method: 'put', // *GET, POST, PUT, DELETE, etc.
            cache: "no-cache",
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({
                username: this.state.username,
                currentPassword: this.state.currentPwd,
                password: this.state.newPwd,
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json.data)
                if (json.data.ok == 1) {
                    if (this.state.currentPwd.length > 0) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        window.location = '/login'
                    }
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <div className='p-4 bg-white shadow-sm'>
                    <Row>
                        <Col md={12}>
                            <h4 className="font-weight-bold mt-0 mb-3">Settings</h4>
                        </Col>
                        <Col md={12} sm={12} className="mb-4 pb-2" style={{ marginLeft: 20 }}>
                            <div style={{ flexDirection: 'column', marginTop: 10 }}>

                                <label style={{ fontSize: 20 }}>Change username</label>
                                <div className="form-label-group" style={{ maxWidth: 200 }}>
                                    <Form.Control type="text" id="username" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} placeholder="username" />
                                    <Form.Label htmlFor="username">Username</Form.Label>
                                </div>
                            </div>
                            <hr />

                            <div style={{ flexDirection: 'column', marginTop: 20, marginBottom: 15 }}>
                                <label style={{ fontSize: 20 }}>Change password</label>
                                <div className="form-label-group">
                                    <div className="form-label-group" style={{ maxWidth: 200 }}>
                                        <Form.Control type="password" id="currentpwd" value={this.state.currentPwd} onChange={e => this.setState({ currentPwd: e.target.value })} placeholder="currentpwd" />
                                        <Form.Label htmlFor="currentpwd">Current password</Form.Label>
                                    </div>
                                    <div className="form-label-group" style={{ maxWidth: 200 }}>
                                        <Form.Control type="password" id="newPwd" value={this.state.newPwd} onChange={e => this.setState({ newPwd: e.target.value })} placeholder="newPwd" />
                                        <Form.Label htmlFor="newPwd">New password</Form.Label>
                                    </div>
                                    <div className="form-label-group" style={{ maxWidth: 200 }}>
                                        <Form.Control type="password" id="confirmPwd" value={this.state.confirmPwd} onChange={e => this.setState({ confirmPwd: e.target.value })} placeholder="confirmPwd" />
                                        <Form.Label htmlFor="confirmPwd">Confirm password</Form.Label>
                                    </div>
                                </div>
                            </div>
                            {this.state.message.length > 0 && <alert className="alert alert-danger" style={{ marginTop: 10 }}>{this.state.message}</alert>}

                            <Form.Group>
                                <Link className="btn btn-primary btn-block btn-lg btn-gradient" style={{ maxWidth: 150, marginTop: 30 }} onClick={this.save}>Save</Link>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
export default Settings;