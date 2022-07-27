import React, { useEffect, useRef, useState } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useLocation } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { io } from 'socket.io-client';
//import ReactAudioPlayer from 'react-audio-player';

const socket = io(process.env.REACT_APP_SERVER, {
    auth: {
        token: window.localStorage.getItem('jwt'),
    },
});

const VideoStream = () => {
    const query = new URLSearchParams(useLocation().search);
    const roomId = query.get('room');
    const iscaller = query.get('iscaller');
    const CurrentUserId = query.get('auth');
    const videoGrid = useRef();
    const ring = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);
    useEffect(() => {
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
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            const myPeer = new Peer(CurrentUserId);
            const myVideo = document.createElement('video'); // Create a new video tag to show our video
            myVideo.muted = true; // Mute ourselves on our end so there is no feedback loop
            myVideo.id = 'own';
            // var getUserMedia =
            //     navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            myPeer.on('open', (userId) => {
                if (iscaller) ring.current.play();
                // When we first open the app, have us join a room
                socket.emit('call-start', roomId, userId, iscaller);
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
                        setTimeout(connectToNewUser, 4000, userId, stream);
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
    return (
        <div className="video-container">
            <audio
                ref={ring}
                src={require('../../Assets/ring.wav')}
                loop={true}
                style={{ display: 'none' }}
            />
            <div ref={videoGrid}></div>
            <div className="btn-container">
                <button onClick={myPeerAudio} className={audio ? '' : 'btn-active'}>
                    <VolumeOffIcon />
                </button>
                <button onClick={() => window.close()} className="danger">
                    <CallIcon />
                </button>
                <button onClick={myPeerCamera} className={camera ? '' : 'btn-active'}>
                    <VideocamOffIcon />
                </button>
            </div>
        </div>
    );
};
export default VideoStream;
// useEffect(() => {
//     window.addEventListener('beforeunload', (e) => {
//         e.preventDefault();
//         console.log(socket);
//         confirm('Press a button!');
//         socket.emit('call-end', roomId, CurrentUserId, iscaller);
//         return '';
//     });
// }, [roomId, CurrentUserId, iscaller]);
// useEffect(() => {
//     addEventListener('beforeunload', (event) => {
//         event.preventDefault();
//         if (confirm('Press a button!') === true) {
//             console.log('OK');
//         } else {
//             console.log('cancel');
//         }
//     });
// }, []);
