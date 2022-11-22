import { Card } from 'react-bootstrap';
import { Star, HeartStraight, X } from 'phosphor-react'
import { Movies } from '../pages/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../services/axios';
import * as actions from '../store/modules/auth/actions';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

interface CardProps {
    movieFavorited?: boolean;
    data: Movies;
}

export function CardMovie({ movieFavorited = false, data }: CardProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [favorited, setFavorited] = useState<boolean>(movieFavorited);
    const [openCardReveal, setOpenCardReveal] = useState<boolean>(false);
    const { id: userId } = useSelector((state: any) => state.auth.user);

    const { pathname } = useLocation();

    function handleFavoriteMovie(userId: string, movieId: string, favoriteMovie: boolean) {

        dispatch(actions.favoriteMovie({ userId, movieId, favoriteMovie, navigate }));

        setFavorited(!favorited);
    }

    return (
        <Card style={{ width: '300px' }}>
            <Card.Img variant='top' src={data.poster} alt="Movie Poster" />
            <Card.Body className='position-relative'>
                {pathname !== '/added' && <button className='icon' onClick={() => handleFavoriteMovie(userId, data.id, !favorited)}>
                    <HeartStraight
                        color='white'
                        size={30}
                        weight={favorited ? 'fill' : 'regular'}

                    />
                </button>}
                <a id='activator' onClick={() => setOpenCardReveal(true)}>
                    <Card.Title>{data.title}</Card.Title>
                </a>
                <p>
                    <Star color='#ff7912' weight='fill' /> {data.rate}
                </p>
            </Card.Body>
            <div className={`position-absolute bottom-0 w-100 card-reveal ${openCardReveal ? 'h-100' : 'h-0'}`}>
                <div id='content' className={`${!openCardReveal && 'd-none'} text-center m-3`}>
                    <a
                        className='position-absolute top-0 end-0 mt-2 me-2'
                        onClick={() => setOpenCardReveal(false)}
                    ><X size={24} color='black' /></a>

                    <h2>Synopsis</h2>
                    <p className='text-justify'>{data.synopsis}</p>
                </div>
            </div>
        </Card >
    )
}