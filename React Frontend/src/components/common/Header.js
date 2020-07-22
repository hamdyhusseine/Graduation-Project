import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavExpanded: false
		};
	}
	setIsNavExpanded = (isNavExpanded) => {
		this.setState({ isNavExpanded: isNavExpanded });
	}
	closeMenu = () => {
		this.setState({ isNavExpanded: false });
	}

	handleClick = (e) => {
		if (this.node.contains(e.target)) {
			// if clicked inside menu do something
		} else {
			// If clicked outside menu, close the navbar.
			this.setState({ isNavExpanded: false });
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}

	logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		window.location = ('/listing')
	}

	render() {
		return (
			<div ref={node => this.node = node}>
				<Navbar onToggle={this.setIsNavExpanded}
					expanded={this.state.isNavExpanded} color="light" expand='lg' className="navbar-light osahan-nav shadow-sm">
					<Container>
						<Navbar.Brand to="/" onClick={x => window.location = '/'}><Image src="/img/Logo.png" alt='' width="200px" /></Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse id="navbarNavDropdown">
							<Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
								<Nav.Link eventKey={0} as={NavLink} activeclassname="active" exact to="/listing">
									Home <span className="sr-only">(current)</span>
								</Nav.Link>

								{
									!!localStorage.token ?
										<>
											<Nav.Link eventKey={0} to="/myaccount/requests" as={NavLink} exact>
												My Account
							</Nav.Link>
											<Nav.Link eventKey={0} onClick={this.logout} as={NavLink} exact style={{ color: '#b8341b' }}>
												Logout
							</Nav.Link>

										</>
										:
										<React.Fragment>
											<Nav.Link eventKey={0} to="/register" as={NavLink} exact>
												Sign Up
						 </Nav.Link>

											<Nav.Link eventKey={0} to="/login" as={NavLink} exact>
												Login
						 </Nav.Link>
										</React.Fragment>

								}

								{/* <Nav.Link eventKey={1} as={NavLink} activeclassname="active" to="/offers">
             				<Icofont icon='sale-discount'/> Offers <Badge variant="danger">New</Badge>
			            </Nav.Link>
			            <NavDropdown title="Restaurants" alignRight className="border-0">
			            	<NavDropdown.Item eventKey={2.1} as={NavLink} activeclassname="active" to="/listing">Listing</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={2.2} as={NavLink} activeclassname="active" to="/detail">Detail + Cart</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={2.3} as={NavLink} activeclassname="active" to="/checkout">Checkout</NavDropdown.Item>
			            </NavDropdown>
			            <NavDropdown title="Pages" alignRight>
			            	<NavDropdown.Item eventKey={3.1} as={NavLink} activeclassname="active" to="/track-order">Track Order</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.2} as={NavLink} activeclassname="active" to="/invoice">Invoice</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.3} as={NavLink} activeclassname="active" to="/login">Login</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.4} as={NavLink} activeclassname="active" to="/register">Register</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.5} as={NavLink} activeclassname="active" to="/404">404</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.6} as={NavLink} activeclassname="active" to="/extra">Extra</NavDropdown.Item>

			            </NavDropdown> */}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default Header;