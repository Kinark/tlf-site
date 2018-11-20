import React from 'react';

import apiPath from '~/utils/apiPath';
import gameType from '~/types/gameType';

import Gallery from '~/components/Gallery'

// import styles from './styles.scss';

const Screenshots = ({ game }) => {
   const screenshots = game.Screenshots.map(img => ({ src: apiPath + img.url }))
   return (
      <React.Fragment>
         <h5 className="tk-museo"><i className="icon-picture-layer-1" />Screenshots</h5>
         <div className="row">
            <div className="col xs12">
               <Gallery images={screenshots} showThumbnails />
            </div>
         </div>
      </React.Fragment>
   )
}

Screenshots.propTypes = {
   game: gameType.isRequired
}

export default Screenshots
