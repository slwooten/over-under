import React, { useState } from 'react';

import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './footer.css';

const Footer = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='footer'>
      
      <InfoIcon className='info-icon' onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tired of the usage limits?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Donations recieved below will be put towards upping the usage limit and hopefully remove it all together. <span className='disclaimer'>Disclaimer:</span> Donations may, or may not, be used by me to bet on the over...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: 'none', color: '#41a0f4' }} onClick={handleClose}>No thanks</Button>
          <Button sx={{ textTransform: 'none' }} onClick={handleClose}>
            <a className='donate' href="https://account.venmo.com/u/seth_wooten" target="new">Donate</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Footer;
