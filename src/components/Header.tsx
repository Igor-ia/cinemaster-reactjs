import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { MagnifyingGlass, User } from 'phosphor-react'
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../store/modules/auth/actions';
import { toast } from 'react-toastify';
import { FormEvent, useEffect, useState } from 'react';
import axios from '../services/axios';

export function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { isLoggedIn, user } = useSelector((state: any) => state.auth);

    const [showDropdownSearch, setShowDropdownSearch] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const [foundMovies, setFoundMovies] = useState<[]>([]);

    useEffect(() => {

        if (searchInput) {
            async function getData() {
                await axios(`/movies/search/${searchInput}`)
                    .then(response => setFoundMovies(response.data))

            }
            getData();


            setShowDropdownSearch(true);

        } else {
            setShowDropdownSearch(false);

        }


    }, [searchInput])

    function handleOnBlurSearchInput() {
        setTimeout(() => {
            setShowDropdownSearch(false);
        }, 300);
    }


    function handleSubmit(e: any, movieTitle: string) {
        e.preventDefault();
        return navigate('/search', {
            state: {
                title: movieTitle
            }
        });
    }


    return (
        <nav className='nav-extended d-flex flex-column'>
            <div className='ms-auto m-2'>
                {
                    isLoggedIn ?
                        (
                            <ul className='d-flex flex-row'>
                                <li className='list-unstyled m-2'><Link to='/' className={`text-white text-decoration-none p-2 ${pathname === '/' && 'active'}`}>Gallery</Link></li>
                                <li className='list-unstyled'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant='none' className='text-white text-decoration-none p-2'>
                                            <User
                                                size={24}
                                            />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.ItemText>Name:<strong>{user.name}</strong></Dropdown.ItemText>
                                            <Dropdown.Divider />
                                            <Dropdown.Item><Link to='/added' className='text-decoration-none text-black'>My Movies</Link></Dropdown.Item>
                                            <Dropdown.Item className='text-danger' onClick={() => dispatch(actions.loginFailure())}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className='d-flex flex-row'>
                                <li className='list-unstyled m-2'><Link to='/register' className='text-white text-decoration-none p-2 '>Register</Link></li>
                                <li className='list-unstyled m-2'><Link to='/login' className='text-white text-decoration-none p-2 '>Login</Link></li>
                            </ul>
                        )
                }
            </div>

            <div className='nav-title text-white mx-auto mb-4'>
                <h1 className='display-3'>CINEMASTER</h1>
            </div>

            {pathname === '/' || pathname === '/favorites' || pathname === '/added' ? (

                <div className='bg-purple d-flex flex-row align-items-center'>
                    <Link to='/' className={`px-2 text-white text-decoration-none p-2 ${pathname === '/' && 'active'}`}>ALL</Link>
                    <Link to='/favorites' className={`px-2 text-white text-decoration-none p-2 ${pathname === '/favorites' && 'active'}`}>FAVORITES</Link>


                    <Form
                        onSubmit={(e: any) => handleSubmit(e, searchInput)}
                        className='w-50 mx-auto bg-transparent py-0'
                    >
                        <Form.Group className='d-flex flex-row'>
                            <Form.Control
                                onBlur={handleOnBlurSearchInput}
                                onChange={(e: any) => setSearchInput(e.target.value)}
                                type="text"
                                className='my-1'
                            />
                            <Button type="submit" variant='success'>
                                <MagnifyingGlass size={24} />
                            </Button>
                        </Form.Group>
                        <Dropdown show={showDropdownSearch}>

                            <Dropdown.Menu>
                                {
                                    foundMovies.map((movie: any, index) => (
                                        <Dropdown.Item key={index} onClick={(e: any) => handleSubmit(e, movie.title)}>{movie.title}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form>


                </div>
            )
                : (
                    <div className='bg-purple p-4'></div>
                )
            }
        </nav>
    );
}