import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import IntlMessages from '../../../../../Util/IntlMessages';


const EmployeeDetail = ( props ) => {

    const [employee, setEmployee] = useState();
    const [loaded, setLoaded] = useState(false);
    const [jobTitle, setJobTitle] = useState('')
    const [receipt, setReceipt] = useState(null);
    const [show, setShow] = useState(false);
    const [notesShow, setNotesShow] = useState(false);
    const [receiptShow, setReceiptShow] = useState(false);
    const [contractShow, setContractShow] = useState(false);
    const [notes, setNotes] = useState('');
    const [description, setDescription] = useState('');
    const [contract, setContract] = useState(null)
    const [userId, setUserId] = useState();


    const id = props.match.params.id;

    useEffect(() => {
        axios.get('/admin/employee/' + id)
            .then((res) => {
                console.log(res.data)
                setEmployee(res.data.employee)
                setUserId(res.data.id)
                setLoaded(true)
            })
    }, [loaded])

    const handleShow = () => {
        console.log('hello')
        setShow(!show);
    }
    const notesShowHandler = () => {
        console.log('hello')
        setNotesShow(!notesShow);
    }
    const contractShowHandler = () => {
        console.log('hello')
        setContractShow(!contractShow);
    }

    const makeAdminHandler = () => {
        props.history.push('/admin/subAdmin/'+ id)
    }

    const receiptShowHandler = () => {
        setReceiptShow(!receiptShow);
    }

    const onInputHandler = (e) => {
        setJobTitle(e.target.value);
    }
    const onNotesChangeHandler = ( e ) => {
        setNotes(e.target.value);
    }
    const notify = (msg) => toast.success(msg ,{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = {
            jobTitle
        }

        axios.put('/admin/employee/'+ id, formData)
            .then((res) => {
                console.log(res.data)
                notify('Position Updated Successfully')
                setShow(false)
                setLoaded(false)
            })
    }

    const onNotesSubmitHandler = (e) => {
        e.preventDefault();
        const formData = {
            notes
        }

        axios.put('/admin/employeeNotes/'+ id, formData)
            .then((res) => {
                console.log(res.data)
                notify()
                setNotesShow(false)
                setLoaded(false)
            })
    }

    const form = (
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor=""><IntlMessages id="new_pos" /></label>
                <input type="text" className="form-control" id="" name="jobTitle" onChange={onInputHandler}
                       value={jobTitle} />
            </div>
            <div className="pull-right">
                <button type="button" onClick={handleShow} className="btn btn-secondary" data-dismiss="modal"><IntlMessages id="close" />
                </button>
                <button type="submit" className="btn btn-primary btn-save"><IntlMessages id="update" /></button>
            </div>
        </form>
    )

    const fileSelectHandler = (e) => {
        let files = e.target.files[0];
        setReceipt(files);
    }

    const contractSelectHandler = (e) => {
        let files = e.target.files[0];
        setContract(files);
    }

    const contractUploadHandler = ( e ) => {
        e.preventDefault()
        const data = new FormData()
        data.append('contract', contract)
        data.append('status', 'Admin')
        axios.post('/upload/' + userId, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                notify('Contract Uploaded Successfully');
                setContract(null);
                setLoaded(false);
                setContractShow(false)
            })
    }
    const fileUploadHandler = ( e ) => {
        e.preventDefault()
        const data = new FormData()
        data.append('receipt', receipt)
        data.append('description',description )
        axios.post('/payment/' + id, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                notify('Receipt Uploaded Successfully');
                setReceipt(null);
                setLoaded(false);
                setReceiptShow(false)
            })
    }

    const notesForm = (
        <form onSubmit={onNotesSubmitHandler}>
            <div className="form-group">
                <label htmlFor=""><IntlMessages id="add_edit" /></label>
                <input type="text" className="form-control" id="" name="notes" onChange={onNotesChangeHandler}
                       value={notes} />
            </div>
            <div className="pull-right">
                <button type="button" onClick={notesShowHandler} className="btn btn-secondary" data-dismiss="modal"><IntlMessages id="close" />
                </button>
                <button type="submit" className="btn btn-primary btn-save"><IntlMessages id="update" /></button>
            </div>
        </form>
    )

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
    }
    const role = localStorage.getItem('role')

    return (
      <>

          <Modal
              show={contractShow}
              onHide={contractShowHandler}
              animation={false}
              size={'md'}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title><IntlMessages id="add_contract" /></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={contractUploadHandler} className={'mb-4'}>
                      <Form.File
                          label={'Upload Contract'}
                          onChange={contractSelectHandler}
                          custom
                      />

                      <div className="float-right mt-3">
                          {contract ? <Button type="submit"  variant={'outline-warning'}><IntlMessages id="send" /></Button> : <Button type="submit" disabled  variant={'outline-warning'}><IntlMessages id="send" /></Button>}
                      </div>
                  </Form>
              </Modal.Body>
          </Modal>
          <Modal
              show={receiptShow}
              onHide={receiptShowHandler}
              animation={false}
              size={'md'}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title><IntlMessages id="add_pay" /></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={fileUploadHandler} className={'mb-4'}>
                      <Form.File
                          label={'Upload Contract'}
                          onChange={fileSelectHandler}
                          custom
                      />
                      <Form.Control type={'text'} value={description} onChange={descriptionChangeHandler}/>

                      <div className="float-right mt-3">
                          {receipt ? <Button type="submit"  variant={'outline-warning'}><IntlMessages id="send" /></Button> : <Button type="submit" disabled  variant={'outline-warning'}><IntlMessages id="send" /></Button>}
                      </div>
                  </Form>
              </Modal.Body>
          </Modal>
          <Modal
              show={show}
              onHide={handleShow}
              animation={false}
              size={'lg'}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title><IntlMessages id="edit_pos" /></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {form}
              </Modal.Body>
          </Modal>

          <Modal
              show={notesShow}
              onHide={notesShowHandler}
              animation={false}
              size={'lg'}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title><IntlMessages id="add_note" /></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {notesForm}
              </Modal.Body>
          </Modal>

          {loaded ? employee ? <div className="content">
              <div className="container-fluid">
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
                  <div className="row">
                      <div className="col-md-12 job-list">
                          <div className="card">
                              <div className="card-header card-header-primary">
                                  <h4 className="card-title mb-0">{employee.applicationForm.firstName}</h4>
                                  <p className={"card-body"}>{employee.applicationForm.notes}</p>
                              </div>

                              <div className="card-body">
                                  <div className="row mt-2 align-items-start">
                                      <div className="col-lg-12 mb-4">
                                          <div className="d-flex justify-content-end">
                                              <button type="button"
                                                      onClick={notesShowHandler}
                                                      className="btn btn-attachment btn-warning">
                                                  <IntlMessages id="add_note" />
                                              </button>
                                              <button type="button"
                                                      onClick={handleShow}
                                                      className="btn btn-attachment btn-warning mx-4">
                                                  <IntlMessages id="edit_pos" />
                                              </button>
                                              <button type="button" onClick={receiptShowHandler}
                                                      className="btn btn-attachment btn-warning">
                                                <IntlMessages id="pay" />
                                              </button>
                                              <button type="button" onClick={contractShowHandler}
                                                      className="btn btn-attachment btn-warning mx-4">
                                                  <IntlMessages id="add_contract" />
                                              </button>
                                              {
                                                  !role.includes('subAdmin')  ?
                                                      <button type="button" onClick={makeAdminHandler}
                                                              className="btn btn-attachment btn-warning mx-4">
                                                        <IntlMessages id="make_admin" />
                                                      </button>
                                                      : ''
                                              }
                                          </div>
                                      </div>
                                      <div className="col-lg-12 mb-2">
                                          <div className="card rounded shadow border mb-4 project-view-card">
                                              <div className="card-body">
                                                  <div className="row align-items-start">
                                                      <div className="col-md-6 col-lg-3 my-3 text-center border-right">
                                                          <h4><IntlMessages id="position" /></h4>
                                                          <p>{employee.applicationForm.jobListing.jobTitle}</p>
                                                      </div>
                                                      <div className="col-md-6 col-lg-2 my-3 text-center border-right">
                                                          <h4><IntlMessages id="projects" /></h4>
                                                          <p>{employee.noticeOfIntents.length}</p>
                                                      </div>
                                                      <div className="col-md-6 col-lg-3 my-3 text-center border-right">
                                                          <h4><IntlMessages id="email" /></h4>
                                                          <p>{employee.email}</p>
                                                      </div>
                                                      <div className="col-md-6 col-lg-3 my-3 text-center">
                                                          <h4><IntlMessages id="contact" /></h4>
                                                          <p>{employee.applicationForm.phoneNumber}</p>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-lg-7">
                                          <div className="card rounded shadow border mb-4 project-view-card">
                                              <div className="card-header"><IntlMessages id="contract" /></div>
                                              <div className="card-body">
                                                  <div className="table-responsive">
                                                      <table className="table table-striped to-do-list">
                                                          <thead className="">
                                                          <th>#</th>
                                                          <th><IntlMessages id="date" /></th>
                                                          <th><IntlMessages id="file" /></th>
                                                          <th><IntlMessages id="uploader" /></th>
                                                          </thead>
                                                          <tbody>
                                                          {employee.contracts.length > 0 ?
                                                              employee.contracts.map((i, index) => (
                                                                  <tr key={index}>
                                                                      <td>{i.id}</td>
                                                                      <td className="text-primary">
                                                                          <a href={'https://sgn-backend.herokuapp.com/upload/'+i.id}>{i.name}</a>
                                                                      </td>
                                                                      <td>{i.createdAt}</td>
                                                                      <td>{i.status}</td>
                                                                  </tr>
                                                              ))
                                                              : <h4 className={'text-center'}><IntlMessages id="noContract_found" /></h4>
                                                          }
                                                          </tbody>
                                                      </table>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-lg-5">
                                          <div className="card rounded shadow border mb-4 project-view-card">
                                              <div className="card-header"><IntlMessages id="benefits" /></div>
                                              <div className="card-body">
                                                  <div className="table-responsive">
                                                      <table className="table recent-files">
                                                          <thead>
                                                          <tr><th>#</th>
                                                              <th><IntlMessages id="title" /></th>
                                                              <th><IntlMessages id="descrip" /></th></tr>
                                                          </thead>
                                                          <tbody>
                                                          {employee.benefits.map((i, index) => (
                                                          <tr key={index}>
                                                              <td>{i.id}</td>
                                                              <td>{i.title}</td>
                                                              <td>{i.description}</td>
                                                          </tr>
                                                      ))}
                                                          </tbody>
                                                      </table>
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
          </div> : <h4><IntlMessages id="no_emp" /></h4> : <div className="text-center"><Spinner /></div>}
      </>
    );
}

export default EmployeeDetail;
