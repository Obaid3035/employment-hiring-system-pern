import React from "react";
import { NavLink } from 'react-router-dom';
import IntlMessages from '../Util/IntlMessages';

const NotFound = () => (
    <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className={'text-muted'}
                style={{
                    fontSize: "120px",
                    fontFamily: "sans-serif",
                    fontWeight: "bold"
                }}> 404 </h1>
            <h4><IntlMessages id="404_error" /></h4>
        </div>
    </div>
)

export default NotFound;


