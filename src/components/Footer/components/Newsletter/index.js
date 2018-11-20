import React from 'react';
import axios from 'axios';

import apiPath from '~/utils/apiPath'

import LoadingWrapper from '~/components/LoadingWrapper'
import Input from '~/components/Input'
import Button from '~/components/Button'

// import styles from './styles.scss';

const maxEmails = 5

export default class Newsletter extends React.Component {
   state = {
      newsletterEmail: '',
      success: null,
      loading: false,
      counter: 1
   };

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   handleInput = e => this.setState({ newsletterEmail: e.target.value })

   restartForm = () => this.setState(prevState => ({ success: null, loading: false, counter: prevState.counter + 1 }))

   addEmail = e => {
      e.preventDefault();
      this.setState({ loading: true })
      const { newsletterEmail } = this.state
      axios.post(`${apiPath}/api/newsletteremails`, { Email: newsletterEmail }, { cancelToken: this.activeAxios.token })
         .then(() => this.setState({ success: true, loading: false, newsletterEmail: '' }))
         .catch(() => this.setState({ success: false, loading: false, newsletterEmail: '' }))
   }

   render() {
      const { newsletterEmail, success, loading, counter } = this.state
      return (
         <React.Fragment>
            {success === null && (
               <LoadingWrapper loading={loading}>
                  Add your email to our newsletter.<br />
                  We won't flood you. It's a promise.
                  <form onSubmit={this.addEmail}>
                     <div className="row">
                        <div className="input-field col xs12 center">
                           <Input type="email" name="author" value={newsletterEmail} onChange={this.handleInput} placeholder="example@email.com" className="center" unlabeled required />
                        </div>
                        <div className="col xs12"><Button type="submit">Submit</Button></div>
                     </div>
                  </form>
               </LoadingWrapper>
            )}
            {success === true && (
               <div className="center">
                  <i className="icon-receipt-1 large no-mrg" />
                  <h6 className="bold no-mrg">Thanks!</h6>
                  <p>Your e-mail has been added.</p>
                  {counter >= maxEmails && <p>I'm sorry, you've added enough emails for today :)</p>}
                  {counter < maxEmails && <Button onClick={this.restartForm}>Add another email</Button>}
               </div>
            )}
            {success === false && (
               <div className="center">
                  <i className="icon-alien large no-mrg" />
                  <h6 className="bold no-mrg">Oooops!</h6>
                  <p>Your e-mail has already been added.</p>
                  {counter < maxEmails && <Button onClick={this.restartForm}>Add another email</Button>}
               </div>
            )}
         </React.Fragment>
      );
   }
}
