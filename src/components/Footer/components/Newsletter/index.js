import React from 'react';
import axios from 'axios';

import apiPath from '~/utils/apiPath'

// import styles from './styles.scss';

export default class Newsletter extends React.Component {
   state = {
      newsletterEmail: '',
      success: null,
   };

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   handleInput = e => this.setState({ newsletterEmail: e.target.value })

   addEmail = () => {
      const { newsletterEmail } = this.state
      axios.post(`${apiPath}/api/newsletteremail`, { Email: newsletterEmail }, { cancelToken: this.activeAxios.token })
         .then(() => this.setState({ success: true }))
         .catch(() => this.setState({ success: false }))
   }

   render() {
      const { newsletterEmail, success } = this.state
      return (
         <React.Fragment>
            Add your email to our newsletter.<br />
            We won't flood you. It's a promise.
            <form onSubmit={this.addEmail} className="row no-mrg">
               <div className="input-field col xs12 center">
                  <input type="text" name="newsletterEmail" value={newsletterEmail} onChange={this.handleInput} placeholder="example@email.com" className="center dead-blue-clear-text" />
               </div>
               <br /><button type="submit">Ahhhh</button>
               {success === true && <p>Success, email added!</p>}
               {success === false && <p>Email already added.</p>}
            </form>
         </React.Fragment>
      );
   }
}
