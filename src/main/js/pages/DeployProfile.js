import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MessageDialog, { openDialog } from '../dialogs/MessageDialog';
import {newJob} from   '../logic/Logic'
import Store from '../data/Store';

class DeployProfile extends React.Component {

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

  orderCar = () => {
	  openDialog({ message: 'Vehicle ' + this.context.brand + ' ordered.' });
  }
  
  cancelSubmit = (event) => {
    event.preventDefault();    
    this.refs.addDialog.hide();    
  }
  //https://github.com/xotahal/react-native-material-ui/issues/258
  render() {
	  
	//this.setState({brand: this.context.brand, model: this.context.model,color: this.context.color,registerNumber: this.context.registerNumber, state: this.context.state, price: this.context.price});
	  
    return (
      <div>

          <h3>Ordering Car</h3>
          <form>
          <TextField label="Brand" placeholder="brand"  name="brand" value={this.context.brand} onChange={this.handleChange}/><br/>
          <TextField label="Model" placeholder="model"  name="model" value={this.context.model} onChange={this.handleChange}/><br/>
          <TextField label="Color" placeholder="color" name="color" value={this.context.color} onChange={this.handleChange}/><br/>
          <TextField label="RegisterNumber" placeholder="registerNumber" value={this.context.registerNumber} name="registerNumber" onChange={this.handleChange}/><br/>
          <TextField label="Year" placeholder="year" name="year" value={this.context.year} onChange={this.handleChange}/><br/>
          <TextField label="Price" placeholder="price" name="price" value={this.context.price} onChange={this.handleChange}/><br/>
          </form>     

        <div>
            <Button variant="raised" color="primary" style={{'margin': '10px'}} onClick={this.orderCar}>Order</Button>
        </div>
        <div>
        	<MessageDialog/>
        </div>
      </div>   
    );
  }
}

export default DeployProfile;