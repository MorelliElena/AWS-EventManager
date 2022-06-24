import React, {useState} from "react";

function Alert(props) {
    let [hide, setShow] = useState(props.state)
        return (
            !hide ?
                 props.error?
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div className="ps-2 pe-1 text-start col-10">{props.message}</div>
                    <button type="button col-2" className="btn-close" data-bs-dismiss="alert"
                            aria-label="Close" onClick={()=> setShow(props.handler(!hide))}/>
                </div>
                :
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <div className="ps-2 pe-1 text-start col-10">{props.message}</div>
                    <button type="button col-2" className="btn-close" data-bs-dismiss="alert"
                            aria-label="Close" onClick={()=> setShow(props.handler(!hide))}/>
                </div> : null
        );
}
export default Alert