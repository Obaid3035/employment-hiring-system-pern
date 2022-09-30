import React from 'react';
import './Button.css'

const Button = ( props ) => {
    const STYLES = [
        'btn-primary',
        'btn-warning',
        'btn-danger'
    ]
    const SIZES = ['btn-medium', 'btn-small'];


    const CheckButtonStyles = STYLES.includes(props.buttonStyle) ?
        props.buttonStyle :
        STYLES[0];
    const CheckButtonSizes = SIZES.includes(props.buttonSize) ?
        props.buttonSize :
        SIZES[0];

    return (
      <button className={`btn ${CheckButtonStyles} ${CheckButtonSizes}`} onClick={props.onClick} type={props.type}>
          {props.children}
      </button>
    );
}

export default Button;
