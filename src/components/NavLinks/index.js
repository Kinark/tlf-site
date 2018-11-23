import React from 'react';

import { AppContext } from '~/instances/context';

import NavItem from './components/NavItem';

export default () => (
   <AppContext.Consumer>
      {context => (
         <React.Fragment>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/games">Games</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <li><a target="_blank" rel="noopener noreferrer" href={context.generalVariables.blog}>BLOG</a></li>
            <NavItem to="/about">About</NavItem>
            {/* <NavItem to="/deeplake">Deeplake</NavItem> */}
         </React.Fragment>
      )}
   </AppContext.Consumer>
)
