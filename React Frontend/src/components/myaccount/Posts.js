import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import CardItem from '../common/CardItem';
import { Image, Badge, Button } from 'react-bootstrap';
import Icofont from 'react-icofont';
class Posts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            showPostRequests: false,
            post: {}
        };
    }

    async componentDidMount() {
        let url = 'http://localhost:4000/api/place/seller/posts/'
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
                this.setState({ data: json.data })
                // this.setState({ listing: json.data, isLoading: false })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.context)
        return (
            <>
                <div className='p-4 bg-white shadow-sm'>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <Col md={9}>
                                    <h4 className="font-weight-bold mt-0 mb-3">Properties</h4>
                                </Col>
                                <Col md={3}>
                                    <Button style={{ float: 'right' }} onClick={() => window.location = "/myaccount/seller/addplace"} variant="outline-success" type="button" id="button-2"><Icofont icon="plus" /> Add Property</Button>
                                </Col>
                            </Row>

                        </Col>
                        <Col md={12} sm={12} className="mb-4 pb-2">
                            {this.state.data.length > 0 ? this.state.data.map(list => (
                                <Col md={12} sm={12} className="mb-4 pb-2">
                                    <CardItem
                                        list={list}
                                        isDeleteButton={true}
                                        isRentButton={false}
                                        isShowRequestsButton={true}
                                        isEditButton={true}
                                        imageAlt='Product'
                                        image='img/list/1.png'
                                        imageClass='img-fluid item-img'
                                        promotedVariant='dark'
                                        favIcoIconColor='text-danger'
                                    />
                                </Col>
                            )) :
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '22px',
                                    marginTop: '30px'
                                }}>You didn't post any properties for rental yet</p>}
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
export default Posts;