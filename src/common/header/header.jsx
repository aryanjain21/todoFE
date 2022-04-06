import React from 'react';
import './header.scss';
import { useUser } from '../../context/userContext';

const Header = (props) => {

    const { user } = useUser();

    return (
        <div className='header_container'>
            <div className='inner_wrapper'>
                <div className='section_one'>
                    <div className='logo' onClick={() => {
                        if (typeof window !== 'undefined' && window.location) {
                            window.location.href = '/to-do';
                        }
                    }}>
                        <span className='txt'>Tasc</span>
                    </div>
                </div>
                <div className='section_three'>
                    {user.token &&
                        <>
                            <div className='profile_image'>
                                {user && user.firstName && user.firstName.toUpperCase()} {user && user.lastName && user.lastName.charAt(0).toUpperCase()}
                            </div>
                            <div className='log_out' onClick={() => {
                                if (typeof window !== 'undefined' && window.location) {
                                    window.location.href = '/login';
                                    localStorage.removeItem('setUser');
                                }
                            }}>
                                Log Out
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;