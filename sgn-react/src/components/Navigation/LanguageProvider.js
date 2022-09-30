/**
 * Language Select Dropdown
 */
import React, { useState } from 'react';
//  import { useDispatch, useSelector } from 'react-redux';
import { DropdownToggle, DropdownMenu, Dropdown } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import { setLanguage } from '../../store/action/language';
import { Badge } from 'reactstrap';
import "./Navigation.css";



// actions
//  import { setLanguage, rtlLayoutAction } from 'Store/vendor/actions';

function LanguageProvider(props) {
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    // const dispatch = useDispatch();
    // const settings = useSelector(state => state.settings);
    // function to toggle dropdown menu
    const toggle = () => {
        setLangDropdownOpen(!langDropdownOpen);
    }

    const onChangeLanguage = (lang) => {
        setLangDropdownOpen(false);
        localStorage.setItem('lang', JSON.stringify(lang))
        props.setLanguage(lang)
    }

    const { locale, languages } = props.locale;


    return (
        <>

            <Dropdown nav className="list-inline-item language-dropdown tour-step-7" isOpen={langDropdownOpen} toggle={toggle}>
                <DropdownToggle caret nav className="header-icon language-icon">
                    <Tooltip title="Languages" placement="bottom">
                        <img src={`${process.env.PUBLIC_URL}/flag-icons/${locale.icon}.png`} className="mr-10" width="25" height="16" alt="lang-icon" />
                    </Tooltip>
                </DropdownToggle>
                <DropdownMenu>
                    <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
                        <ul className="list-unstyled mb-0 dropdown-list">
                            {languages && languages.map((language, key) => (
                                <li key={key} onClick={() => onChangeLanguage(language)}>
                                    <a className="local-li" href="!#" onClick={e => e.preventDefault()}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/flag-icons/${language.icon}.png`}
                                            width="30"
                                            height="16"
                                            alt="lang-icon"
                                        />
                                
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Scrollbars>
                </DropdownMenu>
            </Dropdown>
        </>);
}

const mapStateToProps = state => {
    return {
        locale: state.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => dispatch(setLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
