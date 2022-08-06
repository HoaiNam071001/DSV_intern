import React, { useEffect, useRef, useState } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useLocation } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { io } from 'socket.io-client';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';
import { selectUser, selectIsError } from '../../redux/reducers/authSlice';
import { useSelector } from 'react-redux';
const audiocall = require('../../Assets/ring.wav');
const socket = io(process.env.REACT_APP_SERVER, {
    reconnection: false,
    autoConnect: false,
    auth: {
        token: window.localStorage.getItem('jwt'),
    },
});

const VideoStream = () => {
    const query = new URLSearchParams(useLocation().search);
    const roomId = query.get('room');
    const iscaller = query.get('iscaller');
    const CurrentUserId = query.get('auth');
    const currentUser = useSelector(selectUser);
    const error = useSelector(selectIsError);
    const videoGrid = useRef();
    const ring = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);

    useEffect(() => {
        if (currentUser) {
            if (CurrentUserId === currentUser.id) {
                socket.connect();
                socket.on('connect', () => {
                    setIsConnected(true);
                });
                socket.on('disconnect', () => {
                    setIsConnected(false);
                });
                socket.on('user-disconnected', () => {
                    window.close();
                });

                return () => {
                    socket.off('connect');
                    socket.off('disconnect');
                    socket.off('user-connected');
                    socket.off('user-disconnected');
                    socket.disconnect();
                };
            }
        }
    }, [currentUser, CurrentUserId]);

    useEffect(() => {
        if (isConnected) {
            const myPeer = new Peer(CurrentUserId);
            const myVideo = document.createElement('video'); // Create a new video tag to show our video
            myVideo.muted = true; // Mute ourselves on our end so there is no feedback loop
            myVideo.id = 'own';

            myPeer.on('open', (userId) => {
                if (iscaller) ring.current.play();
                setTimeout(() => {
                    if (!ring.current.paused) window.close();
                }, 20000);
                // When we first open the app, have us join a room
                socket.emit('call-start', roomId, userId, iscaller);
            });
            socket.on('user-accept', () => {
                ring.current.pause();
            });
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream) => {
                    window.localStream = stream;
                    addVideoStream(myVideo, stream); // Display our video to ourselves

                    //is called
                    myPeer.on('call', (call) => {
                        // When we join someone's room we will receive a call from them
                        call.answer(stream); // Stream them our video/audio
                        const video = document.createElement('video'); // Create a video tag for them
                        call.on('stream', (userVideoStream) => {
                            // When we recieve their stream
                            addVideoStream(video, userVideoStream); // Display their video to ourselves
                        });
                    });

                    socket.on('user-connected', (userId) => {
                        // If a new user connect
                        //connectToNewUser(userId, stream)
                        setTimeout(connectToNewUser, 2000, userId, stream);
                        ring.current.pause();
                    });
                })
                .catch((err) => {
                    const error = document.createElement('div');
                    error.innerHTML = err;
                    videoGrid.current.append(error);
                });
            const connectToNewUser = (userId, stream) => {
                // This runs when someone joins our room
                const call = myPeer.call(userId, stream); // Call the user who just joined
                // Add their video
                const video = document.createElement('video');
                call.on('stream', (userVideoStream) => {
                    addVideoStream(video, userVideoStream);
                });
                // If they leave, remove their video
                call.on('close', () => {
                    video.remove();
                });
            };
        }
    }, [isConnected, CurrentUserId, roomId, iscaller]);
    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            // Play the video as it loads
            video.play();
        });
        videoGrid.current.append(video); // Append video element to videoGrid
    };
    const myPeerAudio = () => {
        localStream.getAudioTracks()[0].enabled = !audio;
        setAudio(!audio);
    };
    const myPeerCamera = () => {
        localStream.getVideoTracks()[0].enabled = !camera;
        setCamera(!camera);
    };
    if (
        !window.localStorage.getItem('jwt') ||
        error ||
        (currentUser && CurrentUserId !== currentUser?.id)
    )
        return (
            <div className="video-container d-flex justify-content-center align-items-center">
                <h1 style={{ color: 'white' }}>401 Authorization Required</h1>
            </div>
        );

    return (
        <div className="video-container">
            <audio ref={ring} src={audiocall} loop={true} style={{ display: 'none' }} />
            <div ref={videoGrid}></div>
            <div className="btn-container">
                <Tooltip
                    title={audio ? 'Mute microphone' : 'Unmute microphone'}
                    placement="top"
                    arrow
                >
                    <button onClick={myPeerAudio}>
                        {audio ? <VolumeUpIcon /> : <VolumeOffIcon />}
                    </button>
                </Tooltip>
                <Tooltip title="End call" placement="top" arrow>
                    <button onClick={() => window.close()} className="danger">
                        <CallIcon />
                    </button>
                </Tooltip>

                <Tooltip title={camera ? 'Turn off video' : 'Turn on video'} placement="top" arrow>
                    <button onClick={myPeerCamera}>
                        {camera ? <VideocamIcon /> : <VideocamOffIcon />}
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};
export default VideoStream;
