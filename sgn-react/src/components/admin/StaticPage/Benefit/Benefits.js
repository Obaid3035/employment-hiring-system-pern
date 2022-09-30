import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/wrapper/Wrapper";
import axios from "axios";
import formConfig from "../../../../helpers/formConfig";
import Input from "../../../UI/Input/Input";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import IntlMessages from '../../../../Util/IntlMessages';


const Benefits = ( props ) => {
    const [benefitData, setBenefitData] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [benefitForm, setBenefitForm] = useState({
        title: formConfig('input', 'col-md-12','text', 'Title'),
        description: formConfig('textarea', 'col-md-12','text', 'Description'),
    })
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    useEffect(() => {

        if(role.includes('subAdmin')) {
            axios.get('/subAdmin-benefits', {headers: {"Authorization": `Bearer ${token}`}})
                .then((res) => {
                    setBenefitData(res.data);
                    setLoaded(true)
                })
        } else {
            axios.get('/admin/benefits')
                .then((res) => {
                    setBenefitData(res.data);
                    setLoaded(true)
                })
        }
    },[loaded])

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedBenefitForm = {
            ...benefitForm
        }

        const updatedFormElement = {
            ...updatedBenefitForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedBenefitForm[inputIdentifier] = updatedFormElement;

        setBenefitForm(updatedBenefitForm);
    }


    const formElementArray = [];
    for (const key in benefitForm ) {
        formElementArray.push({
            id: key,
            config: benefitForm[key],
        })
    }

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for(const formElementIdentifier in benefitForm) {
            formData[formElementIdentifier] = benefitForm[formElementIdentifier].value;
        }

        axios.post('/admin/benefit', formData)
            .then((res) => {
                console.log(res);
                setShow(false)
                setLoaded(false)
                successNotify('Benefit Created SuccessFully')
                setBenefitForm({
                    title: formConfig('input', 'col-md-12','text', 'Title'),
                    description: formConfig('textarea', 'col-md-12','text', 'Description'),
                })
            })
    }

    const form = (
        <form onSubmit={formSubmitHandler}>
            <div className="form-row">
                {formElementArray.map(( formElement, index ) => (
                    <Input
                        key={index}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                        label={formElement.config.elementConfig.placeholder}
                        class={formElement.config.elementCol}
                    />
                ))}
            </div>
            <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}><IntlMessages id="create_benefit" /></Button>
        </form>
    )

    const handleShow = () => {
        setShow(!show);
    }

    const onDeleteHandler = (id) => {
        axios.delete('/admin/benefit/' + id)
            .then((res) => {
                console.log(res.data)
                setLoaded(false)
            }).catch((err) => {
            setLoaded(true)
        })
    }
    const table = benefitData.map((notice, index) => {
        return (
            <tr key={index}>
                <td>{notice.id}</td>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
                <td><button type="button" onClick={() => onDeleteHandler(notice.id)} className="btn btn-danger"><IntlMessages id="delete" />
                </button></td>
            </tr>
        )
    })
    return (
        <Aux>
            <div className="content">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="benefit_list" /></h3>
                                    <button style={{fontSize: "15px"}} type="button" onClick={handleShow}
                                            className="btn btn-primary"><IntlMessages id="add_benefit" />
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-12 my-5">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    {loaded ? benefitData.length > 0
                                                        ?<table className="table">
                                                            <thead className="">
                                                            <tr>
                                                                <th>
                                                                <IntlMessages id="main_id" />
                                                                </th>
                                                                <th>
                                                                <IntlMessages id="title" />
                                                                </th>
                                                                <th>
                                                                <IntlMessages id="description" />
                                                                </th>
                                                                <th>
                                                                    Action
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {table}
                                                            </tbody>
                                                        </table>
                                                        : <h4 className="text-center"><IntlMessages id="no_benefit" /></h4>
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
            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="add_benefit" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </Aux>
    );
}

export default Benefits;
