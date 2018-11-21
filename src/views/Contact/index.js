import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ReCaptcha } from 'react-recaptcha-v3'

import apiPath from '~/utils/apiPath'
import variables from '~/instances/variables';
import { withContext } from '~/instances/context';

import LoadingWrapper from '~/components/LoadingWrapper'
import Textarea from '~/components/Textarea'
import Input from '~/components/Input'
import Button from '~/components/Button'

const maxMessages = 5

class Contact extends React.Component {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   state = {
      author: '',
      email: '',
      msg: '',
      recaptchaToken: '',
      success: null,
      loading: false,
      error: null,
      counter: 1
   };

   componentWillMount = () => {
      const { context } = this.props
      context.changeAppTitle('Contact');
   }

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   // eslint-disable-next-line no-underscore-dangle
   verifyRecaptcha = recaptchaToken => this.setState({ recaptchaToken })

   handleInput = e => this.setState({ [e.target.name]: e.target.value })

   restartForm = () => this.setState(prevState => ({ success: null, error: null, loading: false, counter: prevState.counter + 1 }))

   formHandler = e => {
      e.preventDefault();
      this.setState({ loading: true })
      const { author, email, msg, recaptchaToken } = this.state
      axios.post(`${apiPath}/contacter`, { author, email, msg, recaptchaToken }, { cancelToken: this.activeAxios.token })
         .then(res => this.setState({ success: res.data.success, error: res.data.error, loading: false, author: '', email: '', msg: '', recaptchaToken: '' }))
         .catch(() => this.setState({ success: false, loading: false, error: 'no connection with the API.' }))
   }

   render() {
      const { author, email, msg, success, error, loading, counter } = this.state
      return (
         <React.Fragment>
            <div className="container">
               {success === null && (
                  <LoadingWrapper loading={loading}>
                     <form onSubmit={this.formHandler}>
                        <ReCaptcha sitekey={variables.recaptchaCode} verifyCallback={this.verifyRecaptcha} />
                        <div className="row">
                           <div className="input-field col xs12 m6">
                              <Input maxLength="70" name="author" label="Name" value={author} onChange={this.handleInput} placeholder="Ray Rays" required />
                           </div>
                           <div className="input-field col xs12 m6">
                              <Input maxLength="70" name="email" label="Email" type="email" value={email} onChange={this.handleInput} placeholder="example@email.com" required />
                           </div>
                           <div className="input-field col xs12">
                              <Textarea maxLength="1750" name="msg" label="Message (max 1750)" value={msg} onChange={this.handleInput} placeholder="Well, I guess..." required />
                           </div>
                           <div className="col xs12 right-align">
                              <Button type="submit">Send message</Button>
                           </div>
                        </div>
                     </form>
                  </LoadingWrapper>
               )}
               {success === true && (
                  <div className="center">
                     <i className="icon-airplane xlarge no-mrg" />
                     <h3 className="bold no-mrg">Thanks!</h3>
                     <h6>Your message has been sent.</h6>
                     {counter >= maxMessages && <p>I'm sorry, you've sent enough messages for today :)</p>}
                     {counter < maxMessages && <Button onClick={this.restartForm}>Send another message</Button>}
                  </div>
               )}
               {success === false && (
                  <div className="center">
                     <i className="icon-alien xlarge no-mrg" />
                     <h3 className="bold no-mrg">Oooops!</h3>
                     <h6>Something went wrong</h6>
                     <p>And the reason is: {error}</p>
                     <Button onClick={this.restartForm}>Try again</Button>
                  </div>
               )}
               {success === false && <p>Ooops!</p>}
            </div>
         </React.Fragment>
      )
   }
}

export default withContext(Contact);
