import React from "react";

const ToDoList = ( props ) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.businessName}</td>

            <td className="">
                <span className="badge badge-pill badge-info">{props.status}</span>
            </td>
            <td>
                <button onClick={() => props.handleShow(props.id)} role="button"
                   className="btn btn-sm btn-warning"><i className="far fa-eye" /></button>
                {
                    props.status === 'successful' ?
                        <>
                            <button onClick={() => props.toCompletedHandler(props.id)} role="button"
                                    className="btn btn-sm btn-success"><i className="fa fa-check" /></button>
                            <button onClick={() => props.onDeleteHandler(props.id)} role="button"
                                    className="btn btn-sm btn-danger"><i className="fas fa-cross" /></button>
                        </>
                    : ''
                }
            </td>
        </tr>
    );
}

export default ToDoList;
