import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
    this.redirect = this.redirect.bind(this);
  }
  

  componentDidMount() {
    const keycloak = new Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated })
        // alert(authenticated ? 'authenticated' : 'not authenticated');
    }).catch(function() {
        alert('failed to initialize');
    });
  }

  redirect(){
    window.location.href = 'http://localhost:10001/auth/admin/master/console/#/realms/development/clients/ce40f25b-a77e-44cd-a35c-679620084975/installation';
    // maybe can add spinner while loading
    return null;
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
          <UserInfo keycloak={this.state.keycloak} />
          <br/>
          {/* <p>
            <iframe  src="http://127.0.0.1:10001/auth/admin/master/console/#/realms/development/clients/ce40f25b-a77e-44cd-a35c-679620084975/installation" width="800" height="600"></iframe>
          </p> */}
          {/* <button onClick={this.redirect}>Redirect to keycloak</button> */}
          {/* <a href="http://localhost:10001/auth/admin/master/console/#/realms/development/clients/ce40f25b-a77e-44cd-a35c-679620084975/installation" target="_blank" rel="noopener noreferrer">Click here</a> */}
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;