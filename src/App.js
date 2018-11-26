import React from 'react';
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom';
import { Title, Metas } from '~/components/Metas';
import Favicon from '~/components/Favicon';
import { loadReCaptcha } from 'react-recaptcha-v3'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import ReactGA from 'react-ga';

import { AppContext } from '~/instances/context';
import variables from '~/instances/variables';
import fetchGeneralVariables from '~/services/fetchGeneralVariables';

import PageTitle from '~/components/PageTitle';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';

import Home from '~/views/Home';
import Contact from '~/views/Contact';
import About from '~/views/About';
import Games from '~/views/Games';
import Game from '~/views/Game';
// import Deeplake from '~/views/Deeplake';

import styles from './styles.scss'
import './styles.global.scss';
import './components/Ceres/styles.global.scss';

ReactGA.initialize('UA-129766006-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends React.Component {
   state = {
      inverted: false,
      appTitle: 'The Last Flame',
      appTitleBar: true,
      generalVariables: null
   }

   componentDidMount = () => {
      fetchGeneralVariables(this.activeAxios.token).then(genVars => {
         const generalVariables = {};
         genVars.map(genVar => {
            generalVariables[genVar.VariableName] = genVar.VariableValue
            return genVar;
         })
         return this.setState({ generalVariables });
      }).catch(e => console.log(e))
      loadReCaptcha(variables.recaptchaCode)
   }

   componentWillUnmount = () => this.activeAxios.cancel('Canceled by the user.')

   activeAxios = axios.CancelToken.source()

   turnOnInverted = () => { this.setState({ inverted: true }); };

   turnOffInverted = () => { this.setState({ inverted: false }); };

   changeAppTitle = (appTitle, appTitleBar = true) => { this.setState({ appTitle, appTitleBar }); };

   setGeneralVariables = generalVariables => { this.setState({ generalVariables }); };

   render() {
      const { inverted, appTitle, appTitleBar, generalVariables } = this.state;
      const { turnOnInverted, turnOffInverted, changeAppTitle } = this;
      const description = 'The Last Flame is a indie game development company. We hope to lit your way and make you fall in love with our games :)';
      if (!generalVariables) {
         return (
            <div className={styles.pageLoader}>
               <Loader type="Ball-Triangle" color="#fafafa" height={50} width={50} />
            </div>
         )
      }
      return (
         <AppContext.Provider value={{ inverted, appTitle, appTitleBar, generalVariables, turnOnInverted, turnOffInverted, changeAppTitle }}>
            <Favicon />
            <Title>{appTitle}</Title>
            <Metas description={description} />
            <div id="content" className={`${styles.appColors} ${inverted ? styles.inverted : ''}`}>
               <Route path="/(.+)" component={Navbar} />
               {appTitleBar === true && <PageTitle />}
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/about" component={About} />
                  <Route path="/games" component={Games} />
                  <Route path="/game/:gameTitle" component={Game} />
                  {/* <Route path="/deeplake" component={Deeplake} /> */}
               </Switch>
            </div>
            <div id="footer">
               <Footer />
            </div>
         </AppContext.Provider>
      );
   }
}

export default hot(module)(App)
