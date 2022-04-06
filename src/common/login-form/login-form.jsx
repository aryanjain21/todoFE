import './login-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ShowPassword from '../../assets/icon/open_eye.svg';
import HidePassword from '../../assets/icon/close_eye.svg';
import { useState } from 'react';
import { login } from '../../services/api';
import { useUser } from '../../context/userContext';
import { toast } from 'react-toastify';
import CircleLoader from "react-spinners/CircleLoader";

const LoginForm = (props) => {

    const { userDispatch } = useUser();
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const InitialValues = {
        email: '',
        password: ''
    }

    const ValidationSchema = yup.object({
        email: yup
            .string()
            .trim()
            .required('Please enter email')
            .email('Please enter a valid email'),
        password: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
    });

    return (
        <div className='login_form_container'>
            <div className='title'>
                Sign In
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={async (values) => {
                    try {
                        setLoader(true);
                        const res = await login(values);
                        if (res.data.status === 200) {
                            toast.success(res.data.message);
                            setLoader(false);
                            let user = res.data.data;
                            localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token }));
                            userDispatch({ type: 'SIGNIN', payload: user });
                            if (typeof window !== 'undefined' && window.location) {
                                window.location.href = '/to-do';
                            }
                        }
                    } catch (error) {
                        setLoader(true);
                        toast.error(error?.response?.data?.message);
                    }
                }}>
                <Form className='control_area'>
                    <div className='form_control'>
                        <div className='label'>Email Id</div>
                        <div className='form_input'>
                            <Field type="text" name='email' placeholder='Eg:abc@gmail.com' />
                        </div>
                        <ErrorMessage className='error' name="email" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>Password</div>
                        <div className='form_input'>
                            <Field type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />
                            <div className='icon_area' onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? ShowPassword : HidePassword} alt='password' />
                            </div>
                        </div>
                        <ErrorMessage className='error' name="password" component="div" />
                    </div>
                    <div className='btn_area'>
                        <button className='btn' type='submit'>Sign In</button>
                    </div>
                </Form>
            </Formik>
            <div className='account_link'>
                <span>New to To DO App? </span>
                <a href='/signup'>Create Your Account</a>
            </div>            
            <CircleLoader css={`position: fixed;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                margin: auto;`}
                size={50} color={'#24a0ed'} loading={loader} speedMultiplier={1} />
        </div>
    );
}

export default LoginForm;