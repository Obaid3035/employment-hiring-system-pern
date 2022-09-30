import React, {useEffect, useState} from 'react';
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {NavLink} from "react-router-dom";
import IntlMessages from '../../../../../Util/IntlMessages';

const QuoteView = (props) => {
    const id = props.match.params.id;
    const [quoteData, setQuoteData] = useState();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('/quote/'+ id)
            .then((res) => {
                setQuoteData(res.data)
                setLoaded(true)
            })
        console.log(quoteData)
    }, [loaded])
    return (
        loaded ?
            quoteData ? <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mb-5">
                            <NavLink to={'/admin/quote'} className="btn btn-warning"><IntlMessages id="back_btn" /></NavLink>
                        </div>
                        {quoteData.file ?  <div className="col-md-4 mb-5">
                            <p><IntlMessages id="file" /></p>
                            <a href={'https://sgn-backend.herokuapp.com/file/'+quoteData.file.id}>{quoteData.file.name}</a>
                        </div> : ''}
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0"><IntlMessages id="review_quote" /></h4>
                                </div>
                                <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="first_name" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="firstName" value={quoteData.firstName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="last_name" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="lastName" value={quoteData.lastName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="company" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="companyName" value={quoteData.companyName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="company_add" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="companyAddress" value={quoteData.companyAddress} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="email" />Email</label>
                                                    <input type="text" className="form-control" id="" name="email" readOnly
                                                           value={quoteData.email}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="phone_no" /></label>
                                                    <input type="tel" className="form-control" id="" name="phoneNumber"
                                                           readOnly value={quoteData.phoneNumber} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="best_way" /></label>
                                                    <input type="text" className="form-control" id="" name="wayToReach"
                                                           readOnly value={quoteData.bestOption} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="best_date" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="dateTime" value={quoteData.timeToReach} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="industry" /></label>
                                                    <input type="text" className="form-control" id="" name="ProductIndustry"
                                                           readOnly value={quoteData.industry} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="name_product" /></label>
                                                    <input type="text" className="form-control" id="" name="productName"
                                                           readOnly value={quoteData.productName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="picture_doc" /></label>
                                                    <input type="text" className="form-control" readOnly value="abc.pdf" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="quality_pro" /></label>
                                                    <input type="text" className="form-control" id="" name="productQuantity"
                                                           readOnly value={quoteData.quantity} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="target_price" /></label>
                                                    <input type="text" className="form-control" readOnly id="" name="price"
                                                           value={quoteData.pricePerUnit} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="soon" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="ExpectedTimeofDelivery" value={quoteData.howSoon} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="delivery_add" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="sameDeliveryAddress" value={quoteData.checkAddress ? 'Yes' : 'No'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="delivery_add" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.Address} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                    <IntlMessages id="scale_10" /></label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.lastInteractive} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                    <IntlMessages id="scale_repres" /> </label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.representative} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                    <IntlMessages id="scale_recom" /> </label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.recommend} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                    <IntlMessages id="ref_code" /> </label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.code} />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                    <IntlMessages id="interaction" />  </label>
                                                    <input type="text" className="form-control" readOnly id=""
                                                           name="deliveryAddress" value={quoteData.representative} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <h3 className={'text-center'}><IntlMessages id="no_quote" /></h3>

            : <div className={'text-center'}>
        <Spinner />
    </div>
    );
};

export default QuoteView;
