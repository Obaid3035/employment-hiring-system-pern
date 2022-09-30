import React, {useState, useEffect} from 'react';
import './SubAdminForm.css'
import formConfig from "../../../../../helpers/formConfig";
import Input from "../../../../UI/Input/Input";
import {NavLink} from 'react-router-dom';
import Aux from "../../../../../hoc/wrapper/Wrapper";
import axios from "axios";
import IntlMessages from '../../../../../Util/IntlMessages';
import {Form} from "react-bootstrap";
const SubAdminForm = ( props ) => {
    const [loaded, setLoaded] = useState(true);
    const [permissionForm, setPermissionForm] = useState({
        subAdmin: '',
        employee: '',
        project: '',
        job: '',
        application: '',
        quote: ''
    })
    const id = props.match.params.id;


    useEffect(() => {
        axios.get('/subAdmin/' + id)
            .then((res) => {
                console.log(res.data)
                const roleDetail = {
                    job: res.data.job,
                }
                setPermissionForm(roleDetail)
                setLoaded(false)
            })
    }, [loaded]);


    const formElementArray = [];

    for (let key in permissionForm) {
        formElementArray.push({
            id: key,
            config: permissionForm[key]
        })
    }


    const inputChangeHandler = ( event, inputIdentifier ) => {
        const updatedPermissionForm = {
            ...permissionForm
        };
        updatedPermissionForm[inputIdentifier] = !updatedPermissionForm[inputIdentifier]
        setPermissionForm(updatedPermissionForm);
    }

    const submitHandler = (e) => {
        const formData = {};

        for(let formElementIdentifier in permissionForm) {
            formData[formElementIdentifier] = permissionForm[formElementIdentifier]
        }
        axios.post('/subAdmin/' + id, formData)
            .then((res) => {
                setLoaded(true)
            });

        props.history.replace('/admin/subAdmin');
        window.location.reload();
    }
    let form = (
        <form onSubmit={submitHandler}>
            <div className="form-row align-items-center">
                {formElementArray.map((formElement) => (
                    <div className="col-lg-6 mb-5 mt-3" key={formElement.id}>
                        <div className="d-flex align-items-center justify-content-between mt-3 w-75">
                            <div className="d-flex align-items-center">
                                <div className=" bg-light p-3 text-primary mr-3 text-center rounded">
                                    <i className="fas fa-user-tie" />
                                </div>
                                <div>
                                    <h5 className="mb-0 font-weight-bold text-primary">{formElement.id}</h5>
                                    <p className="mb-0"><IntlMessages id="full_access" /></p>
                                </div>
                            </div>
                            <div>

                                <label className="switch">
                                    <input className="inputElement form-control" type="checkbox" placeholder=""
                                           onChange={(e) => inputChangeHandler( e, formElement.id)}
                                           checked={formElement.config}
                                    />
                                    <div className="slider" />
                                </label>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="float-right">
                <NavLink to={'/admin/subAdmin'} replace={true} className="btn btn-lg btn-warning mx-3 px-4"><IntlMessages id="close_btn" /></NavLink>
                <button type="submit" className="btn btn-lg btn-primary btn-save px-4"><IntlMessages id="save_change" /></button>
            </div>
        </form>
    )

  return (
      <div className="content">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-12 job-list">
                      <div className="card permission-card">
                          <div className="card-header card-header-primary">
                              <h4 className="card-title mb-0"><IntlMessages id="permission" /></h4>
                          </div>
                          <div className="card-body">
                              <div className="row justify-content-center">
                                  <div className="col-lg-12">
                                      {form}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default SubAdminForm;
