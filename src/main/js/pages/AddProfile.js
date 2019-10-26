import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MessageDialog, { openDialog } from '../dialogs/MessageDialog';
import {newJob} from   '../logic/Logic'
import Store from '../data/Store';

class AddProfile extends React.Component {

  static contextType = Store;
  
  constructor(props) {
      super(props);
      this.state = {brand: '', model: '', color: '',  registerNumber: '', state: '', price: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  addProfile = () => {
    var newProfile = {brand: this.state.brand, model: this.state.model, color: this.state.color, 
    	        registerNumber: this.state.registerNumber, year: this.state.year, price: this.state.price};
	//const token = sessionStorage.getItem("jwt");
    fetch('api/cars', 
    {   method: 'POST', 
        headers: {
        	'Content-Type': 'application/json'},
        body: JSON.stringify(newProfile)
    })
	.then(() => {openDialog({ message: 'new vehicle added ' + this.state.brand + '!' });})
	.catch(err => console.error(err));
  }
  
  
  cancelSubmit = (event) => {
    event.preventDefault();    
    this.refs.addDialog.hide();    
  }
  //https://github.com/xotahal/react-native-material-ui/issues/258
  render() {
    return (
      <div>

          <h3>New Car</h3>
          <form>
          <TextField label="Brand" placeholder="brand"  name="brand" onChange={this.handleChange}/><br/>
          <TextField label="Model" placeholder="model"  name="model" onChange={this.handleChange}/><br/>
            <TextField label="Color" placeholder="color" name="color" onChange={this.handleChange}/><br/>
            <TextField label="RegisterNumber" placeholder="registerNumber" name="registerNumber" onChange={this.handleChange}/><br/>
            <TextField label="Year" placeholder="year" name="year" onChange={this.handleChange}/><br/>
            <TextField label="Price" placeholder="price" name="price" onChange={this.handleChange}/><br/>
          </form>     

        <div>
            <Button variant="raised" color="primary" style={{'margin': '10px'}} onClick={this.addProfile}>Save Record</Button>
        </div>
        <div>
        	<MessageDialog/>
        </div>
      </div>   
    );
  }
}

export default AddProfile;