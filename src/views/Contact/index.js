import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import apiPath from '~/utils/apiPath'
import { withContext } from '~/instances/context';

import Input from '~/components/Input'
import Button from '~/components/Button'

import './styles.scss';

class Contact extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   state = {
      author: '',
      email: '',
      msg: '',
      success: null
   };

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Contact');
   }

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   handleInput = e => this.setState({ [e.target.name]: e.target.value })

   formHandler = e => {
      e.preventDefault();
      const { author, email, msg } = this.state
      axios.post(`${apiPath}/api/contacter`, { author, email, msg }, { cancelToken: this.activeAxios.token })
         .then(() => this.setState({ success: true }))
         .catch(() => this.setState({ success: false }))
   }

   render() {
      const { author, email, msg, success } = this.state
      return (
         <React.Fragment>
            <div className="container">
               <form onSubmit={this.formHandler}>
                  <div className="row">
                     <div className="input-field col xs12 m6">
                        <Input name="author" value={author} onChange={this.handleInput} placeholder="Ray Rays" />
                     </div>
                     <div className="input-field col xs12 m6">
                        <Input name="email" value={email} onChange={this.handleInput} placeholder="example@email.com" />
                     </div>
                     <div className="input-field col xs12">
                        <Input name="msg" value={msg} onChange={this.handleInput} placeholder="Well, I guess..." />
                     </div>
                     <div className="col xs12 right-align">
                        <Button type="submit">Send Message</Button>
                     </div>
                  </div>
               </form>
               {success === true && <p>Success, message sent!</p>}
               {success === false && <p>Ooops!</p>}
            </div>
         </React.Fragment>
      )
   }
}

export default withContext(Contact);
