// https://material.io/tools/icons/?style=baseline
// https://codesandbox.io/s/vqo8yw5om7

import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import DraftsIcon from '@material-ui/icons/Drafts';
import NoteAdd from '@material-ui/icons/NoteAdd';
import StationIcon from '@material-ui/icons/LocalGasStation';
import Schedule from '@material-ui/icons/Schedule';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/RecordVoiceOver';
import {deploy} from   '../logic/Logic'
import MessageDialog, { openDialog } from '../dialogs/MessageDialog';
import Store from '../data/Store';
// https://mdbootstrap.com/docs/react/advanced/charts/

export const MainMenuItems = (
  <div>
    <ListItem button component={Link} to="/ListProfile">
      <ListItemIcon>
        <PlaylistAdd />
      </ListItemIcon>
      <ListItemText primary="List" />
    </ListItem>
    <ListItem button  component={Link} to="/AddProfile">
      <ListItemIcon>
        <NoteAdd />
      </ListItemIcon>
      <ListItemText primary="Add new..." />
    </ListItem>
  </div>
  );

export const SubMenuItems = (
  <div>
	<Store.Consumer>
	{(name) = () => (
	<div>
    <ListItem button  component={Link} to="/DeployProfile">
      <ListItemIcon>
        <Schedule />
      </ListItemIcon>
      <ListItemText primary="Order" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
        	<MessageDialog/>
    </div>
    )}
	</Store.Consumer>
  </div>
  );