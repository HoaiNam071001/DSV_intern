import List from '../components/Messenger/list';
import MesssengerBody from '../components/Messenger/body';

function Messenger() {
    return (
        <div className="messenger-container container">
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                    <div className="messenger-header">H1</div>
                    <div className="row">
                        <div className="col-md-3 col-sm-4">
                            <List />
                        </div>
                        <div className="col-md-9 col-12 col-sm-8">
                            <MesssengerBody />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messenger;
