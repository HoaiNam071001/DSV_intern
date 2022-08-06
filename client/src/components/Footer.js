import React from 'react';
const Footer = () => {
    return (
        <nav className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
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

                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <p>Copyright &copy; 2022, Nguyễn Hoài Nam</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Footer;
