import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from "../../hoc/EmployeeLayout/EmployeeLayout";

const ProtectedRoute = (props) => {
    return <Route path={'/admin'} render={(props) => <AdminLayout {...props} />} />
}

export default ProtectedRoute;
