import React from 'react';
import Spinner from 'react-loader-spinner'

import styles from './styles.scss';

const Loader = () => <div className="container"><div className={styles.loader}><Spinner type="Ball-Triangle" color="#fafafa" height={80} width={80} /></div></div>

export default Loader
