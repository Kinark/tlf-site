import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner'

import styles from './styles.scss';


export default class LoadingWrapper extends React.Component {
   static propTypes = {
      loading: PropTypes.bool.isRequired,
      children: PropTypes.node.isRequired,
      color: PropTypes.string,
   }

   static defaultProps = {
      color: '#fafafa'
   }

   state = {
      // eslint-disable-next-line react/destructuring-assignment
      loading: this.props.loading,
   };

   componentDidUpdate = (prevProps) => {
      const { loading } = this.props;
      if (prevProps.loading === loading) return;
      return this.setState({ loading });
   }

   render() {
      const { children, color } = this.props;
      const { loading } = this.state;
      return (
         <div className={styles.loadingWrapper}>
            {loading && <div className={styles.preloaderWrapper}><Loader type="Ball-Triangle" color={color} height={80} width={80} /></div>}
            <div className={styles.content + (loading ? ` ${styles.loading}` : '')}>{children}</div>
         </div>
      );
   }
}
