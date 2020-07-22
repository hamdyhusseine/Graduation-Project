import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import MyAccount from './components/myaccount/MyAccount';
import List from './components/common/List';
import NotFound from './components/NotFound';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import Detail from './components/common/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select2-wrapper/css/select2.css';
import './App.css';
// ? admin components
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import SellerRegisterForm from './components/Forms/SellerRegisterForm';
import SellerPlaceRequests from './components/myaccount/SellerPlaceRequests'
import SellerAddPlace from './components/myaccount/SellerAddPlace';
import SellerEditPlace from './components/myaccount/SellerEditPlace';
import MapFullScreen from './components/common/MapboxFullScreen';

const SellerRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('token')
  let user = localStorage.getItem('user')

  return (
    <Route {...rest} render={(props) => (
      !!token && !user.isSeller // logged in and not a seller
        ? <Component {...props} />
        : <Redirect to='/listing' />
    )} />
  )
}
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      !!localStorage.user && JSON.parse(localStorage.user).isAdmin// user exists in the cache and is also an admin
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('token')

  return (
    <Route {...rest} render={(props) => (
      !!token // not undefined
        ? <Redirect to='/listing' />
        : <Component {...props} />
    )} />
  )
}


class App extends React.Component {
  render() {
    return (
      <>
        {
          (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/admin/login' && this.props.location.pathname !== '/register') ? <Header /> : ''
        }
        <Switch>
          {/* admin dashboard route */}
          <PublicRoute path="/admin/login" exact component={AdminLogin} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          {/* admin dashboard route */}

          {/* seller dashboard routes */}
          <SellerRoute path="/myaccount/becomeseller" exact component={SellerRegisterForm} />
          <SellerRoute path="/myaccount/seller/requests/" exact component={SellerPlaceRequests} />
          <SellerRoute path="/myaccount/seller/addplace/" exact component={SellerAddPlace} />
          <SellerRoute path="/myaccount/seller/edit/" exact component={SellerEditPlace} />
          {/* <SellerRoute path="/myaccount/seller/dashboard" exact component={SellerDashboardHome} /> */}
          {/* seller dashboard routes */}

          {/* regular users login page route */}
          <PublicRoute path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <Route path="/" exact component={List} />
          <Route path="/mapfs/" exact component={MapFullScreen} />

          <Route path="/listing" exact component={List} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/detail" exact component={Detail} />
          <Route exact component={NotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
