export const Loading2 = () => {
    return (
        // <div className="d-flex justify-content-center">
        //     <div className="spinner-grow" role="status">
        //         <span className="visually-hidden">Loading...</span>
        //     </div>
        // </div>
        <p class="placeholder-glow tag-container">
            <span class="placeholder col-4 m-1 rounded-pill"></span>
            <span class="placeholder col-3 m-1 rounded-pill"></span>
            <span class="placeholder col-3 m-1 rounded-pill"></span>
            <span class="placeholder col-3 m-1 rounded-pill"></span>
            <span class="placeholder col-2 m-1 rounded-pill"></span>
            <span class="placeholder col-5 m-1 rounded-pill"></span>
        </p>
    );
};

const Loading = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
export default Loading;
