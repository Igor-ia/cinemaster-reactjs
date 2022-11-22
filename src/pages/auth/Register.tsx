import { useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import axios from "../../services/axios";
import * as actions from '../../store/modules/auth/actions';

type RegisterProps = {
    name: string;
    email: string;
    password: string;
};

export function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { register, handleSubmit } = useForm<RegisterProps>();


    const onSubmit = async (data: RegisterProps) => {

        const { name, email, password } = data;

        dispatch(actions.registerRequest({ name, email, password, navigate }));

    };
    const onSubmitError = (errors: any) => {
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key].message);
            }
        }
    };

    return (
        <Container className="w-25">
            <Form onSubmit={handleSubmit(onSubmit, onSubmitError)} className="d-flex flex-column border border-gray">
                <h2 className="text-md">Register</h2>
                <Form.Group>
                    <Form.Label htmlFor="">
                        Nome
                    </Form.Label>
                    <Form.Control {...register('name', { required: 'Name is required' })} type="text" />
                </Form.Group>
                <Form.Group>

                    <Form.Label htmlFor="">
                        Email
                    </Form.Label>
                    <Form.Control {...register('email', { required: 'Email is required' })} type="email" />
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
                <Button type="submit" variant="success">Confirm</Button>
            </Form>
        </Container>
    )
}