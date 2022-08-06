import React from 'react';

function Errors() {
    return (
        <div className="container badrequest">
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    <img src={require('../Assets/404.png')} alt="404 Error" />
                </div>
            </div>
        </div>
    );
}

export default Errors;
