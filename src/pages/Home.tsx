import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardMovie } from "../components/CardMovie";
import { Plus } from 'phosphor-react';

import axios from "../services/axios";
import { Button, Container } from "react-bootstrap";
import { AddMovieModal } from "../components/AddMovieModal";
import { ContainerMovies } from "../components/ContainerMovies";
import { useSelector } from "react-redux";

export interface Movies {
    id: string;
    title: string;
    synopsis: string;
    rate: string;
    poster: string;
    favorite: boolean;
}

export function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [movies, setMovies] = useState<Movies[]>([]);
    const [moviesId, setMoviesId] = useState<Movies[]>([]);

    const { id: userId } = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        axios(`/favorites/${userId}`)
            .then(response => {
                const result = response.data;
                const arrayResult: any = [];
                result.map((item: any) => {
                    arrayResult.push(item.movieId);
                })

                setMoviesId(arrayResult)
            })
    }, [])

    useEffect(() => {
        axios('/movies')
            .then(response => setMovies(response.data))
    }, [moviesId])

    function addMovieOnList(movieAdded: Movies) {
        movies.push(movieAdded);
    }



    return (
        <ContainerMovies>

            {
                movies.map((movie: any, index) =>
                (
                    <CardMovie key={index}
                        data={movie}
                        movieFavorited={moviesId.includes(movie.id)}
                    />
                )
                )
            }

            <AddMovieModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                addMovieOnList={addMovieOnList}
            />

            <button className="add-movie" onClick={() => setModalShow(true)}>
                <Plus
                    size={24}
                    color='white'
                />
            </button>
        </ContainerMovies>
    )
}