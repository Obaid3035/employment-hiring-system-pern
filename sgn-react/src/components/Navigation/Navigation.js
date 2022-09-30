import React from "react";
import './Navigation.css';
import NavigationItems from "./NavigationItems/NavigationItems";
import Logo from '../../assets/img/logo.png'

const Navigation = ( props ) => {
    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-white'} id={'navbar'}>
            <div className={'container'}>
                <a className={'navbar-brand font-weight-bold text-center'} href={'/'}><img src={Logo} alt={'logo'}/></a>
                <button className={'navbar-toggler'} type={'button'} data-bs-toggle={'collapse'} data-bs-target={'#NAVBAR'}>
                    <i className={' nav-icon fa fa-bars'} />
                </button>
                <div id={'NAVBAR'} className={'collapse navbar-collapse justify-content-end'}>
                    <NavigationItems showButton={true} />
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
