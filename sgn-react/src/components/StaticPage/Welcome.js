import React, {useEffect} from "react";
import IntlMessages from '../../Util/IntlMessages';

const Welcome = ( props ) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={'container'}>
            <div className="card text-center mt-5">
                <div className="card-body">
                    <p className="card-text"><IntlMessages id="welcome_para" /></p>
                    <h5 className="card-title"><IntlMessages id="welcome_head" /></h5>
                </div>
                <div className="card-footer text-muted">
                <IntlMessages id="welcome_email" />  
                </div>
            </div>
        </div>
    );
}

export default Welcome;
