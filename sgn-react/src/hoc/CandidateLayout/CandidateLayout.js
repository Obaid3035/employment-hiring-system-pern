import React, {useEffect, useState} from "react";
import Sidebar from "../../components/candidate/Sidebar/Sidebar";
import EmployeeNavbar from "../../components/candidate/Navbars/AdminNavbar";
import {Route, Switch} from "react-router-dom";
import EmployeeProfile from "../../components/employee/StaticPage/Profile/Profile";
import Footer from "../../components/candidate/Footer/Footer";
import sidebarImage from "../../assets/img/sidebar-3.jpg";
import axios from "axios";

const CandidateLayout = ( props ) => {
    const [roleDetail, setRoleDetail] = useState({});

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/admin/role', { headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setRoleDetail(res.data.roleDetail);
            })
    }, [])

    const user = {
        role: ['candidate'],
        roleDetail
    }

    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    return (
        <><div className="wrapper">
            <Sidebar color={color} image={hasImage ? image : ""} user={user}/>
            <div className="main-panel" ref={mainPanel}>
                <EmployeeNavbar />
                <div className="content">
                    <Switch>
                        <Route path={'/candidate/profile'} exact component={EmployeeProfile}/>
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
        </>
    );
}

export default CandidateLayout;
