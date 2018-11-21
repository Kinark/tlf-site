import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from '~/instances/context';

import NavLinks from '~/components/NavLinks';

import styles from './styles.scss';

class Navbar extends React.PureComponent {
   static propTypes = {
      context: PropTypes.shape({}).isRequired,
   }

   state = {
      scrolled: false
   }

   componentDidMount = () => { this.scrolledHandler(); window.addEventListener('scroll', this.scrolledHandler) }

   componentWillUnmount = () => window.removeEventListener('scroll', this.scrolledHandler)

   scrolledHandler = () => this.setState({ scrolled: window.scrollY >= 400 })

   render() {
      const { context } = this.props
      const { scrolled } = this.state
      const scrolledClass = (context.inverted ? styles.bwScrolled : styles.scrolled)
      return (
         <nav className={`${styles.navbar} center ${scrolled ? scrolledClass : ''}`}>
            <ul>
               <NavLinks />
            </ul>
         </nav>
      );
   }
}

export default withContext(Navbar);
