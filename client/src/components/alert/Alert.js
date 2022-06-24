import React, {useState} from "react";
import Choice from "../../common/Choice";

function Alert(props) {
    let alert = Choice.Alert
    let [hide, setShow] = useState(props.state)
        return (
            !hide ?
                 props.type === alert.ERROR ?
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div className="ps-2 pe-1 text-start col-10">{props.message}</div>
                    <button type="button col-2" className="btn-close" data-bs-dismiss="alert"
                            aria-label="Close" onClick={()=> setShow(props.handler(!hide))}/>
                </div>
                : props.type === alert.SUCCESS ?
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <div className="ps-2 pe-1 text-start col-10">{props.message}</div>
                        <button type="button col-2" className="btn-close" data-bs-dismiss="alert"
                                aria-label="Close" onClick={()=> setShow(props.handler(!hide))}/>
                    </div> :
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                         <div className="ps-2 pe-1 text-start col-10">{props.message}</div>
                         <button type="button col-2" className="btn-close" data-bs-dismiss="alert"
                                 aria-label="Close" onClick={()=> setShow(props.handler(!hide))}/>
                    </div> : null
        );
}
export default Alert