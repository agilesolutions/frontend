import React from 'react';
import { render } from 'react-dom'
import MainPage from './templates/MainPage';
import {HashRouter } from 'react-router-dom';
import Store from './data/Store';
//https://material-ui.com/components/checkboxes/
window.React = React


    window.sessionStorage.setItem("avatar", 'images/avatar/nobody.jpg');
    window.sessionStorage.setItem("auth", false);


render(

  <HashRouter>
    <div>
		<Store.Provider value={{id: 1, brand: 'brand', model: 'model', color: 'color', registerNumber: 'registerNumber', year: 'year', price: 'price'}}>
	  			<MainPage />
    	</Store.Provider>
    </div>
  </HashRouter>,
  document.getElementById('ReactContainer')
)		

