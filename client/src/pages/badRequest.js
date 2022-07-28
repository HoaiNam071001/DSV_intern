import React from 'react';

function Errors() {
    return (
        <div className="container">
            <div className="row detail-article">
                <div className="col-12 ">
                    <img
                        src={require('../Assets/404.png')}
                        width="100%"
                        height="auto"
                        alt="404 Error"
                    />
                </div>
            </div>
        </div>
    );
}

export default Errors;
