import React from 'react';
import PropTypes from 'prop-types';

import { Discord, Facebook, YouTube, Twitter } from './components/Svgs';

import styles from './styles.scss';

const SocialLink = ({ social, href, target, height, color }) => {
   const cpnts = {
      discord: Discord,
      facebook: Facebook,
      youtube: YouTube,
      twitter: Twitter,
   }
   const Social = cpnts[social]
   return <a target={target} href={href} rel="noopener noreferrer" className={styles.socialLink}><Social height={height} color={color} /></a>
}

SocialLink.propTypes = {
   social: PropTypes.oneOf(['discord', 'facebook', 'youtube', 'twitter']).isRequired,
   href: PropTypes.string.isRequired,
   target: PropTypes.string,
   height: PropTypes.string,
   color: PropTypes.string,
}

SocialLink.defaultProps = {
   target: '_blank',
   height: '',
   color: undefined,
}

export default SocialLink
