import React from 'react';

import gameType from '~/types/gameType';

import Header from './components/Header'
import SubHeader from './components/SubHeader'
import GameNavbar from './components/GameNavbar'
import Trailer from './components/Trailer'
import Info from './components/Info'
import Screenshots from './components/Screenshots'
import Press from './components/Press'
import Rewards from './components/Rewards'

import styles from './styles.scss';

const GameTemplate = ({ game }) => (
   <div className={styles.gameWrapper}>
      <Header game={game} />
      <SubHeader game={game} />
      <GameNavbar game={game} />
      <div className="container section">
         <div className="row">
            <div className="col xs12 m6">
               <Trailer game={game} />
            </div>
            <div className="col xs12 m6">
               <Info game={game} />
            </div>
            {game.Screenshots.length > 0 && (
               <div className="col xs12">
                  <Screenshots game={game} />
               </div>
            )}
            {game.presses.length > 0 && (
               <div className="col xs12 m6">
                  <Press game={game} />
               </div>
            )}
            {game.rewards.length > 0 && (
               <div className="col xs12 m6">
                  <Rewards game={game} />
               </div>
            )}
         </div>
      </div>
   </div>
)

GameTemplate.propTypes = {
   game: gameType.isRequired
}

export default GameTemplate
