const Toast = ({ setToast }) => {
    return (
        <div>
            <div className="toast-floating" style={{ zIndex: 10 }}>
                <div className="header-toast">
                    Sun Nov 13
                    <button
                        type="button"
                        className="btn-close float-end"
                        onClick={() => setToast(false)}
                    ></button>
                </div>
                <div className="body-toast text-center">Success</div>
            </div>
        </div>
    );
};
export default Toast;
