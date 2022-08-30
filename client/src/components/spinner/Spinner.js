import React from "react";

class Spinner extends React.Component {

    render() {
        return (
            <div className="d-flex justify-content-center h-100 mt-5">
                <div className="spinner-border text-primary"
                     style={{width: "3rem", height: "3rem"}}
                     role="status">
                    <span className="sr-only"> </span>
                </div>
            </div>);
    }

}
export default Spinner