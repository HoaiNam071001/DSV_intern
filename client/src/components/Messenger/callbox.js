import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Close from '@mui/icons-material/Close';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Avatar from '@mui/material/Avatar';
const Avt = require('../../Assets/avatar-thumbnail.jpg');
const Ring = require('../../Assets/ring.wav');
const AlertDialog = ({ userCall, setCall, authId, socket }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (userCall) setOpen(true);
    }, [userCall]);
    const handleClose = () => {
        setOpen(false);
        setCall();
    };

    const Decline = () => {
        socket.emit('call-end', userCall.id, authId);
        handleClose();
    };
    const Accept = () => {
        handleClose();
        socket.emit('call-accept', userCall.id);
        const windowref = window.open(
            `/videocall?room=${userCall?.id}&auth=${authId}`,
            '',
            'height=500,width=800,left=200,top=200'
        );
        windowref.onload = function () {
            windowref.onunload = function () {
                socket.emit('call-end', userCall.id, authId);
            };
        };
    };
    if (!userCall) return <></>;
    return (
        <Dialog
            open={open}
            onClose={Decline}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-center">
                <strong>{userCall.members?.username}</strong> is calling you
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    className="d-flex flex-column align-items-center"
                >
                    <audio src={Ring} loop={true} autoPlay style={{ display: 'none' }} />
                    The call will as soon as you accept
                    <Avatar alt="avatar" src={userCall.members?.image}>
                        <img
                            width="80"
                            height="80"
                            className="m-1 rounded-circle"
                            alt="avatar"
                            src={Avt}
                        />
                    </Avatar>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="d-flex justify-content-center">
                <Button onClick={Accept}>
                    <PhoneCallbackIcon /> Accept
                </Button>
                <Button onClick={Decline}>
                    <Close /> Decline
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AlertDialog;
