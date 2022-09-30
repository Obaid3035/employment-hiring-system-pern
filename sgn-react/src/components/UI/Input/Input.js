import React from 'react';
import './Input.css'
import Aux from "../../../hoc//wrapper/Wrapper";
import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker';

const Input = ( props ) => {
    let inputElement = null
    let classes = 'inputElement form-control';
    if (props.isValid && props.touched) {
         classes = 'inputElement form-control inValid';
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed} required/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed} required/>
            break;
        case ('select'):
            inputElement = (
                <select className={classes}
                        value={props.value}
                        onChange={props.changed}>
                    {props.elementConfig.option.map((op, index) => (
                        <option key={index} value={op.value}>{op.label}</option>
                    ))}
                </select>
            )
            break;

        case ('date'):
            inputElement = (
                <DatePicker selected={props.value}
                            onChange={props.datePickerHandler }
                />
            )
            break;
        case ('dateTime'):
            inputElement = (
                <DateTimePicker
                    onChange={props.datePickerHandler}
                    value={props.value}
                />
            )
            break;
        default:
            inputElement = <input className={classes}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}required/>
    }

    return (
        props.elementConfig.type === 'checkbox' ?
            <Aux>
                <label className={''}>{props.label} </label>
                {inputElement}
            </Aux>
            :
            <div className={props.class}>
                <div className={'input form-group'}>
                    <label className={''}>{props.label} </label>
                    {inputElement}
                </div>
            </div>
    )
}

export default Input;
