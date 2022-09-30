const formConfig = ( elementType, elementCol, type, placeholder, value= '', minLength, maxLength, option ) => {
    return {
        elementType,
        elementCol,
        elementConfig: {
            type,
            placeholder,
            option
        },
        value,
        validation: {
            required: true,
            minLength,
            maxLength
        },
        valid: false,
        touched: false
    }
}

export default formConfig;
