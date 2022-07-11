//import { LoadingWrite } from '../Loading';
function MessBody() {
    return (
        <div className="messenger-body">
            <div className="messenger-body-header d-flex">
                <div className="chatbox-image">
                    <img src={require('../../Assets/avatar-thumbnail.jpg')} alt="Avatar" />
                </div>
                <div className="chatbox-header-info d-flex justify-content-center flex-column">
                    <div className="chatbox-info-name">Hoai Nam</div>
                    <div className="chatbox-info-status">Hoat dong</div>
                </div>
                <div className="btn-videocall ms-auto align-self-center">
                    <i className="bi bi-camera-video"></i>
                </div>
            </div>
            <div className="body-chatbox">
                <div className="chatbox-left d-flex">
                    <div className="chatbox-image">
                        <img
                            src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-6/277532157_3186813384975963_1625147169410545994_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YrbYpTMpa1gAX-vaJf6&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT9wosPvXTXbExZTXlFHOTnyRVWAd6XjpdJ-Y7oMOVwcjQ&oe=62CE7DE9"
                            alt="Avatar"
                        />
                    </div>
                    <div className="chatbox-content d-flex align-items-start flex-column">
                        <div className="chatbox-content-item">hi</div>
                        <div className="chatbox-content-item">
                            Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn
                            hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài{' '}
                        </div>
                    </div>
                </div>

                <div className="chatbox-right d-flex flex-row-reverse">
                    <div className="chatbox-content col-10 d-flex align-items-end flex-column">
                        <div className="chatbox-content-item">hi</div>
                        <div className="chatbox-content-item">Nam</div>
                    </div>
                </div>

                <div className="chatbox-left d-flex">
                    <div className="chatbox-image">
                        <img
                            src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-6/277532157_3186813384975963_1625147169410545994_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YrbYpTMpa1gAX-vaJf6&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT9wosPvXTXbExZTXlFHOTnyRVWAd6XjpdJ-Y7oMOVwcjQ&oe=62CE7DE9"
                            alt="Avatar"
                        />
                    </div>
                    <div className="chatbox-content d-flex align-items-start flex-column">
                        <div className="chatbox-content-item">hi</div>
                        <div className="chatbox-content-item">
                            Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn
                            hoài Nam nguyễn hoài Nam nguyễn hoài Nam nguyễn hoài{' '}
                        </div>
                    </div>
                </div>
                {/* <div className="loading-write d-flex align-items-center justify-content-center">
                    <LoadingWrite />
                </div> */}
            </div>
            <div className="input-chatbox row">
                <div className="chatbox-message col-10 d-flex">
                    <input className="col-11" placeholder="Type a message" />
                    <div className="col-1 icon-chatbox d-flex justify-content-end">
                        <i className="bi bi-emoji-smile"></i>
                    </div>
                </div>
                <div className="chatbox-send col-2 d-flex justify-content-center align-items-center">
                    <button>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessBody;
