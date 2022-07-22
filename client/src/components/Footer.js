import React from 'react';
const Footer = () => {
    return (
        <nav className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-4 d-flex align-items-center">
                        <div className="contain-profile">
                            <div className="username">Nguyễn Hoài Nam</div>
                            <div className="job">Intern developer</div>
                            <div className="d-flex link-contact">
                                <a href="https://www.linkedin.com/in/hoainam07/" target="_blank">
                                    <img src={require('../Assets/linkedin.png')} />
                                </a>
                                <a href="https://www.facebook.com/hoainam.hcmut/" target="_blank">
                                    <img src={require('../Assets/facebook.png')} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-auto col-sm-auto col-md-4 d-flex align-items-center">
                        <div className="contact">
                            <div className="item">
                                <a href="#">
                                    <img src={require('../Assets/telephone-call.png')} />
                                </a>
                                <span>033 622 7712</span>
                            </div>
                            <div className="item">
                                <a href="#">
                                    <img src={require('../Assets/location.png')} />
                                </a>
                                <span>KTX Khu A, ĐHQG Hồ Chí Minh</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 col-sm-5 col-md-4 d-flex align-items-center">
                        <small>Copyright &copy; 2022, Nguyễn Hoài Nam</small>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Footer;
