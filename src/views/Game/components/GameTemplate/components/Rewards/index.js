import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat'

import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

// import Gallery from '~/components/Gallery'

import styles from './styles.scss';

const Rewards = ({ game }) => {
   // const badges = game.rewards.map(reward => ({ src: apiPath + reward.Badge.url, caption: `${reward.Title} - ${reward.Description}` }))
   return (
      <React.Fragment>
         <h5 className="tk-museo"><i className="icon-rewards-trophy-5" />Rewards</h5>
         <div className="row">
            <div className="col xs12">
               {/* <Gallery images={badges} /> */}
               {game.rewards.map(reward => <Badge key={reward} data={reward} />)}
            </div>
         </div>
      </React.Fragment>
   )
}

Rewards.propTypes = {
   game: gameType.isRequired
}

const Badge = ({ data }) => {
   const badgeDiv = (
      <div className={styles.badge}>
         <img src={apiPath + data.Badge.url} alt={data.Title} /><br />
         <span className="weight-bold">{data.Title}</span><br />
         <span className="small weight-light dead-blue-light-text">{dateFormat(data.Date, 'mm/dd/yyyy')}</span>
      </div>
   )
   if (data.Link) return <a href={data.Link} target="_blank" rel="noopener noreferrer">{badgeDiv}</a>
   return badgeDiv
}

Badge.propTypes = {
   data: PropTypes.shape({
      img: PropTypes.string,
      title: PropTypes.string,
      Date: PropTypes.string,
      Link: PropTypes.string
   }).isRequired,
}

export default Rewards
