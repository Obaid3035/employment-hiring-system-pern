import React, {useEffect, useState} from "react";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import axios from "axios";
import {NavLink} from "react-router-dom";
import IntlMessages from '../../../../Util/IntlMessages';

const Quote = () => {
    const [quoteData, setQuoteData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('/quote')
            .then((res) => {
                setLoaded(true)
                setQuoteData(res.data)
            })
    }, [loaded])

    const quoteDelete = (id) => {
        axios.delete('/quote/'+ id)
            .then((res) => {
                setLoaded(false)
                console.log(res.data)
            })
    }

    const table = quoteData.map((query, index) => {
        return (
            <tr key={index}>
                <td>{query.id}</td>
                <td>{query.firstName}</td>
                <td>{query.companyName}</td>
                <td>{query.email}</td>
                <td>
                    <NavLink to={'/admin/quote/'+ query.id} className="btn btn-sm btn-warning mx-3"><i
                        className="fas fa-eye"/></NavLink>
                    <button type="button" onClick={() => quoteDelete(query.id)} className="btn btn-danger"><IntlMessages id="delete" />
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-body">
                                <div className="col-md-12 my-5">
                                    <h3 style={{fontWeight: "bold"}}><IntlMessages id="quote" /></h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                {loaded ? quoteData.length > 0
                                                    ?<table className="table">
                                                        <thead className="">
                                                        <tr>
                                                            <th>
                                                            <IntlMessages id="main_id" />  
                                                            </th>
                                                            <th>
                                                            <IntlMessages id="name" /> 
                                                            </th>
                                                            <th>
                                                            <IntlMessages id="company" />   
                                                            </th>
                                                            <th>
                                                            <IntlMessages id="emai" />   
                                                            </th>
                                                            <th>
                                                            <IntlMessages id="action" />   
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {table}
                                                        </tbody>
                                                    </table>
                                                    : <h4 className="text-center"><IntlMessages id="no_quote" /></h4>
                                                    : <div className="text-center"><Spinner /></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quote;
