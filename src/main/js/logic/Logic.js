import React from 'react';
import MessageDialog, { openDialog } from '../dialogs/MessageDialog';
import Store from '../data/Store';

//https://github.com/MoonHighway/learning-react/blob/master/chapter-11/company-website/src/index.js
//https://stackoverflow.com/questions/43842793/basic-authentication-with-fetch



export const deploy = () =>
 {
 	
 	let username = 'admin';
	let password = 'admin';
	let formdata = new FormData();
	let headers = new Headers();
	
	formdata.append('grant_type','password');
	formdata.append('username','testname');
	formdata.append('password','qawsedrf');
	
	// headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
	
	<Store.Consumer>
	{(name) = () => (
			console.log(name)
	)}
	</Store.Consumer>
	
    fetch('services/startjob/' + name)
    	.catch(err => console.error(err));
 
	openDialog({ message: 'Deployment pipeline executed.' });
	
	console.log('Package deployed');
 }
 
 
 export const newJob = (name) =>
 {
 // https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api
	
    fetch('services/newjob/' + name)
    .then(() => {openDialog({ message: 'New Jenkins Job created.' });
    			})
    .catch(err => console.error(err));
 
  
 
 }
