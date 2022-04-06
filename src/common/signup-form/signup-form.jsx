import '../login-form/login-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ShowPassword from '../../assets/icon/open_eye.svg';
import HidePassword from '../../assets/icon/close_eye.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signUp } from '../../services/api';
import CircleLoader from "react-spinners/CircleLoader";

const SignUpForm = () => {

    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const InitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    const ValidationSchema = yup.object({
        firstName: yup
            .string()
            .trim()
            .required('Please enter name'),
        lastName: yup
            .string()
            .trim(),
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
                Create Your Account
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={async (values) => {
                    try {
                        setLoader(true);
                        const res = await signUp(values);
                        if (res.data.status === 200) {
                            toast.success(res.data.message);
                            setLoader(false);
                            if (typeof window !== 'undefined' && window.location) {
                                window.location.href = '/login'
                            }
                        }
                    } catch (error) {
                        setLoader(false);
                        toast.error(error?.response?.data?.message);
                    }
                }}>
                <Form className='control_area'>
                    <div className='form_control'>
                        <div className='label'>First Name</div>
                        <div className='form_input'>
                            <Field type="text" name='firstName' placeholder='First Name' />
                        </div>
                        <ErrorMessage className='error' name="firstName" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>Last Name</div>
                        <div className='form_input'>
                            <Field type="text" name='lastName' placeholder='Last Name' />
                        </div>
                        <ErrorMessage className='error' name="lastName" component="div" />
                    </div>
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
                        <button className='btn' type={'submit'}>Sign Up</button>
                    </div>
                </Form>
            </Formik>
            <div className='account_link'>
                Already have account? <a href='/login'>Login</a>
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

export default SignUpForm;