import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Icofont from 'react-icofont';
import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import EditProfileModal from '../modals/EditProfileModal';
import RentalRequests from './RentalRequests'
import Settings from './settings';
import Posts from './Posts';
import ConfirmedRentals from './ConfirmedRentals';
import Context from '../context'
class MyAccount extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         user: localStorage.user && JSON.parse(localStorage.user),
         data: {},
         showEditProfile: false
      };
   }

   async componentDidMount() {
      let url = 'http://localhost:4000/api/user/profile/'
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
            this.setState({ data: json })
            // this.setState({ listing: json.data, isLoading: false })
         })
         .catch(err => console.log(err))
   }

   hideEditProfile = () => this.setState({ showEditProfile: false });

   render() {
      return (
         <Context.Provider value={this.state.data}>
            <EditProfileModal show={this.state.showEditProfile} onHide={this.hideEditProfile} />
            <section className="section pt-4 pb-4 osahan-account-page">
               <Container>
                  <Row>
                     <Col md={3}>
                        <div className="osahan-account-page-left shadow-sm bg-white h-100">
                           <div className="border-bottom p-4">
                              <div className="osahan-user text-center">
                                 <div className="osahan-user-media">
                                    <Image className="mb-3 rounded-pill shadow-sm mt-1" src="/img/user/4.png" alt="gurdeep singh osahan" />
                                    <div className="osahan-user-media-body">
                                       <h6 className="mb-2">{this.state.user.username}</h6>
                                       {this.state.user.phone && <p className="mb-1">{this.state.user.phone}</p>}

                                       {this.state.user.isSeller && <div class="row" style={{justifyContent:'center'}}>
                                          <p>Agent
                                             {/* <img style={{ width: 24 }} src="https://img.icons8.com/cotton/64/000000/checkmark.png" /> */}
                                          </p>
                                          <span className="icofont-tick-mark" style={{ height: 10, marginLeft: 4, marginTop: 4 }}></span>
                                       </div>}
                                       {!this.state.user.isSeller && this.state.user.status !== "pending" &&
                                          <Button onClick={() => window.location = "/myaccount/becomeseller"} style={{ width: '80%', fontSize: 13 }} variant="outline-success" type="button" id="button-2"><Icofont icon="list" /> Agents Application</Button>
                                       }
                                       {this.state.user.status == "pending" &&
                                          <Button onClick={() => window.location = "/myaccount/becomeseller"} style={{ width: '80%', fontSize: 13 }} variant="outline-secondary" disabled type="button" id="button-2"><Icofont icon="list" /> Pending </Button>
                                       }
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                              <li className="nav-item">
                                 <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/requests"><i className="icofont-building"></i> Rentals Requests</NavLink>
                              </li>
                              <li className="nav-item">
                                 <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/rentals"><i className="icofont-building-alt"></i> Confirmed Rentals</NavLink>
                              </li>
                              <hr />
                              {this.state.user.isSeller &&
                                 <>
                                    <li className="nav-item" style={{ marginLeft: '21px' }}>
                                       <h4 style={{ fontSize: 17, color: '#7a7e8a' }}>Agent</h4>
                                    </li>
                                    <li className="nav-item" disabled>
                                       <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/posts"><i className="icofont-spreadsheet"></i> Posts</NavLink>
                                    </li>

                                 </>
                              }
                              <li className="nav-item">
                                 <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/settings"><i className="icofont-settings"></i> Settings</NavLink>
                              </li>
                           </ul>
                        </div>
                     </Col>
                     <Col md={9}>
                        <Switch>
                           <Route path="/myaccount/requests" exact component={RentalRequests} />
                           <Route path="/myaccount/rentals" exact component={ConfirmedRentals} />
                           <Route path="/myaccount/posts" exact component={Posts} />
                           <Route path="/myaccount/settings" exact component={Settings} />
                        </Switch>
                     </Col>
                  </Row>
               </Container>
            </section>
         </Context.Provider>
      );
   }
}


export default MyAccount;