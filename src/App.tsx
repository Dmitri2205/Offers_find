import React from 'react';
import Header from '@modules/header/Header';
import {GlobalStyle,ApplicationWraper} from '@styles/global'


export default function App(){
    return (
    <ApplicationWraper>
        <GlobalStyle/>
         <Header/>
      </ApplicationWraper>
    )
}