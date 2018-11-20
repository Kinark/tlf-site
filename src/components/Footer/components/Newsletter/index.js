import React from 'react';
import axios from 'axios';

import apiPath from '~/utils/apiPath'

import Input from '~/components/Input'
import Button from '~/components/Button'

// import styles from './styles.scss';

export default class Newsletter extends React.Component {
   state = {
      newsletterEmail: '',
      success: null,
   };

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   handleInput = e => this.setState({ newsletterEmail: e.target.value })

   addEmail = e => {
      e.preventDefault();
      const { newsletterEmail } = this.state
      axios.post(`${apiPath}/api/newsletteremails`, { Email: newsletterEmail }, { cancelToken: this.activeAxios.token })
         .then(() => this.setState({ success: true }))
         .catch(() => this.setState({ success: false }))
   }

   render() {
      const { newsletterEmail, success } = this.state
      return (
         <React.Fragment>
            Add your email to our newsletter.<br />
            We won't flood you. It's a promise.
            <form onSubmit={this.addEmail}>
               <div className="row">
                  <div className="input-field col xs12 center">
                     <Input name="author" value={newsletterEmail} onChange={this.handleInput} placeholder="example@email.com" className="center" unlabeled />
                  </div>
                  <div className="col xs12"><Button type="submit">Submit</Button></div>
               </div>
               {success === true && <p>Success, email added!</p>}
               {success === false && <p>Email already added.</p>}
            </form>
         </React.Fragment>
      );
   }
}
