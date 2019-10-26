import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import MessageDialog, { openDialog } from '../dialogs/MessageDialog';
import ConfirmDialog, { askConfirmation } from '../dialogs/ConfirmDialog';
import Store from '../data/Store';


// https://www.npmjs.com/package/mui-datatables
class ListProfile extends React.Component {

  static contextType = Store;

  constructor(props) {
    super(props);
    this.state = { profiles: [], open: false, message: ''};
  }
  // https://spring.io/guides/tutorials/bookmarks/
  // https://stackoverflow.com/questions/33237200/fetch-response-json-gives-responsedata-undefined
  // https://stackoverflow.com/questions/36840396/react-fetch-gives-an-empty-response-body
  componentDidMount() {
	    this.fetchCars();
	  }
	  
  componentDidMount() {
	    this.fetchCars();
	  }
  
	  // Fetch all profiles
	  fetchCars = () => {
		//const token = sessionStorage.getItem("jwt");
	    fetch('api/cars', {
	        method: 'GET',
	        credentials: 'same-origin',
	        headers: {"Content-Type": "application/json",
	        	credentials: 'include'}
	      })
	    .then((response) => response.json()) 
	    .then((responseData) => {
	      console.log(responseData)
	      this.setState({ 
	        profiles: responseData,
	      }); 
	    })
	    .catch(err => console.error(err));   
	  }


  render() {
	  
	  const data = this.state.profiles;
	  const rows = [];
	  
	  data.map(r => {
		  var row = [];
		  row.push(r.id);
		  row.push(r.brand);
		  row.push(r.model);
		  row.push(r.color);
		  row.push(r.registerNumber);
		  row.push(r.year);
		  row.push(r.price);
		  
		  rows.push(row);});
	  
	  	
	    const columns = ["id", "brand", "model", "color", "registerNumber", "year", "price"];

	    const options = {
	      filter: true,
	      filterType: 'dropdown',
	      responsive: 'stacked',
	      onRowsDelete: (rowsDeleted) => {
	        //askConfirmation({message: 'Do you want to continue?.'});
		      	rowsDeleted.data.map(r => {
		      		fetch('api/cars/' + rows[r.dataIndex][0], {method: 'DELETE'})
	    				.then(() => console.log('Record ' + rows[r.dataIndex][1] + ' on host ' + rows[r.dataIndex][2] + ' removed!'))
	    				.catch(err => console.error(err));
		      		
		      		}	
		      	)
		      	openDialog({message: 'Selected records deleted.'});
      	  },
	      onRowClick: (rowsData) => {
		      	this.context.id = rowsData[0];
		      	this.context.brand = rowsData[1];
		      	this.context.model = rowsData[2];
		      	this.context.color = rowsData[3];
		      	this.context.registerNumber = rowsData[4];
		      	this.context.year = rowsData[5];
		      	this.context.price = rowsData[6];
		      	openDialog({message: this.context.brand + ' selected!'});
	      	console.log(this.context);
				        
      	  }	      
	    };

    return (
       <div>
          <div>
    	   	<MUIDataTable title={"Cars selection"} data={rows} columns={columns} options={options}/>
    	  </div>
          <div>
           	<MessageDialog/>
          </div>
      </div>
      );
  }
}

export default ListProfile;