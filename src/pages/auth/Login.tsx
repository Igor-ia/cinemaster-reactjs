import { get } from 'lodash';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

import * as actions from '../../store/modules/auth/actions';

type LoginProps = {
    email: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const prevPath = get(location, 'state.prevPath', '/');

    const { register, handleSubmit } = useForm<LoginProps>();


    const onSubmit = (data: LoginProps) => {

        const { email, password } = data;

        if (!(validator.isEmail(email))) {
            return toast.error('Email is invalid');
        }

        dispatch(actions.loginRequest({ email, password, navigate, prevPath }));


    };
    const onSubmitError = (errors: any) => {
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key].message);

            }
        }
    };

    return (
        <div className="container w-25">
            <Form onSubmit={handleSubmit(onSubmit, onSubmitError)} className="d-flex flex-column">
                <h2>Login</h2>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register('email', { required: 'Email is required' })}
                        type="email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="">Password</Form.Label>
                    <Form.Control {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Password must be a max of 20 characters'
                        }
                    })}
                        type="password"
                    />
                </Form.Group>
                <Button type='submit' variant='success'>Connect</Button>
            </Form>
        </div>
    )
}