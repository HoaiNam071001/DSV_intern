import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ userCall, setCall, authId, socket }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (userCall) setOpen(true);
    }, [userCall]);
    const handleClose = () => {
        setOpen(false);
        setCall();
    };

    const handleDecline = () => {
        socket.emit('call-end', userCall.id, authId);
        handleClose();
    };
    const handleAccept = () => {
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
        <div>
            <audio
                src={require('../../Assets/ring.wav')}
                loop={true}
                autoPlay
                style={{ display: 'none' }}
            />
            <Dialog
                open={open}
                onClose={handleDecline}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {userCall.members?.username} is calling you
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The call will as soon as you accept
                        <img
                            width="50"
                            height="50"
                            src={
                                userCall.members?.image ||
                                require('../../Assets/avatar-thumbnail.jpg')
                            }
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDecline}>Decline</Button>
                    <Button onClick={handleAccept} autoFocus>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AlertDialog;
