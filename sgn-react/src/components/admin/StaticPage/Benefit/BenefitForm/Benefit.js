import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const BenefitForm = ( props ) => {

    const [loaded, setLoaded] = useState(false);
    const [benefitData, setBenefitData] = useState([])
    const id = props.match.params.id;
    useEffect(() => {
        axios.get('/admin/user-benefit/' + id)
            .then((res) => {
                console.log(res.data)
                let allBenefit = res.data.benefits
                const userBenefit = res.data.user.benefits;
                if (userBenefit.length > 0) {
                    allBenefit.forEach((i) => {
                        userBenefit.forEach((j) => {
                            if (i.id === j.id) {
                                i.alpha = true
                            }
                        })
                    })
                } else if (allBenefit.length > 0) {
                    allBenefit = allBenefit.map((i) => {
                        return {
                            ...i,
                            alpha: false
                        }
                    })
                }
                console.log(allBenefit)
                setBenefitData(allBenefit)
                setLoaded(true)
                console.log('gg')
            })
    }, [loaded]);

    const inputChangeHandler = ( event, inputIdentifier, index ) => {
        const updatedBenefitData = [...benefitData]
        updatedBenefitData[index].alpha = !updatedBenefitData[index].alpha;
        setBenefitData(updatedBenefitData)

        // updatedBenefits[index].assigned = !updatedBenefits[index].assigned
        // setBenefitData(updatedBenefits)
    }

    const role = localStorage.getItem('role')


    const submitHandler = (e) => {
        e.preventDefault();
        const idArr = []
        benefitData.forEach((i) => {
            idArr.push({id: i.id, assigned: i.alpha})
        })
        axios.post('/admin/addbenefit/' + id, idArr)
            .then((res) => {
                console.log(res)
            })
        if (role.includes('subAdmin')) {
            props.history.replace('/employee');
        } else {
            props.history.replace('/admin/employee');
        }

    }

    let btn = <NavLink to={'/admin/subAdmin'} replace={true} className="btn btn-lg btn-warning mx-3 px-4"><IntlMessages id="close" /></NavLink>
    if(role.includes('subAdmin')) {
        btn = <NavLink to={'/employee/subAdmin'} replace={true} className="btn btn-lg btn-warning mx-3 px-4"><IntlMessages id="close" /></NavLink>

    }

    let form = (
        <form onSubmit={submitHandler}>
            <div className="form-row align-items-center">
                {loaded ? benefitData.length > 0 ?   benefitData.map((benefit, index) => (
                    <div className="col-lg-6 mb-5 mt-3" key={index}>
                        <div className="d-flex align-items-center justify-content-between mt-3 w-75">
                            <div className="d-flex align-items-center">
                                <div className=" bg-dark p-4 text-warning mr-3 text-center rounded">
                                    <i className="fas fa-trophy" />
                                </div>
                                <div>
                                    <h5 className="mb-0 font-weight-bold text-primary">{benefit.title}</h5>
                                    <p className="mb-0">{benefit.description}</p>
                                </div>
                            </div>
                            <div>
                                <label className="switch">
                                    <input className="inputElement form-control" type="checkbox" placeholder=""
                                           onChange={(e) => inputChangeHandler( e, benefit.id, index)}
                                           checked={benefit.alpha}
                                    />
                                    <div className="slider" />
                                </label>

                            </div>
                        </div>
                    </div>
                )) : <h4 className="text-center"><IntlMessages id="no_benefit" /></h4>
                : <div className="text-center"><Spinner /></div>}
            </div>
            <div className="float-right">
                { btn }
                {loaded ? <button type="submit" className="btn btn-lg btn-primary btn-save px-4"><IntlMessages id="save_change" /></button> : <Spinner />}
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
                                <h4 className="card-title mb-0"><IntlMessages id="benefits" /></h4>
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
    )
}

export default BenefitForm
