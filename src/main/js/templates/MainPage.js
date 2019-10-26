import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { MainMenuItems, SubMenuItems } from '../menus/MenuItems';
import MenuAppBar from '../bars/MenuAppBar';
import MessageDialog from '../dialogs/MessageDialog';
import ListProfile from '../pages/ListProfile';
import Login from '../pages/Login';
import AddProfile from '../pages/AddProfile';
import DeployProfile from '../pages/DeployProfile';
import { Switch, Route } from 'react-router-dom'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 840,
    zIndex: 1,
    overflow: 'hidden',
    position: 'top',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  headerDiv: {
	height: 6,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const PageTemplate = (props) => {
  const { classes } = props;

  return (
	// https://material-ui.com/layout/grid/
      <GridList cellHeight={180}>
        <GridListTile  cols={2} style={{ height: 'auto' }}>
      		<MenuAppBar/>
    	</GridListTile >
      	<GridListTile cols={1} style={{ height: 800, width: 'auto' }}>
      		<Drawer variant="permanent"
      				classes={{
      						paper: classes.drawerPaper,
      						}}>
      			<div className={classes.toolbar} />
      			<List>{MainMenuItems}</List>
      			<Divider />
      			<List>{SubMenuItems}</List>
      		</Drawer>
      	</GridListTile>
       	<GridListTile cols={1} style={{ height: 800, width: 1300 }}>
       	// https://github.com/MoonHighway/learning-react/tree/master/chapter-11
      		<main className={classes.content}>
     		 <Switch>
   	        	<Route exact path="/" component={ListProfile} />
   	        	<Route path='/Login' component={Login} />
   	        	<Route path='/ListProfile' component={ListProfile} />
   	        	<Route path='/AddProfile' component={AddProfile} />
   	        	<Route path='/DeployProfile' component={DeployProfile} />
   	        </Switch>
      		</main>
      	</GridListTile>
        <GridListTile  cols={2} style={{ height: 'auto' }}>
        	<div style={{position: 'absolute', bottom: 0, width: '100%'}}>
		 		<Switch>
		 			<Route exact path="/MessageDialog" component={MessageDialog} />
		 		</Switch>
		 	</div>
  		</GridListTile >
      	
      </GridList>
  );
}

PageTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageTemplate);
