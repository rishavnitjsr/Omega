import React, { Fragment } from 'react';
import './UserOptions.css';
import SpeedDial from '@mui/material/SpeedDial';

const UserOptions = ({ user }) => {

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="Profile"
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt="Profile"
          />
        }
      >
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
