import { get } from "lodash";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CardMovie } from "../components/CardMovie";
import { ContainerMovies } from "../components/ContainerMovies";
import axios from "../services/axios";
import { Movies } from "./Home";


export function SearchMovies() {
    const location = useLocation();
    const [foundMovie, setFoundMovie] = useState<Movies[]>([]);
    const [moviesId, setMoviesId] = useState<Movies[]>([]);

    const { id: userId } = useSelector((state: any) => state.auth.user);
    const { title } = location.state;

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
        axios(`/movies/search/${title}`)
            .then(response => setFoundMovie(response.data))
            .catch(error => {
                const errors = get(error, 'response.data.errors', []) as [];

                if (errors.length > 0) {
                    errors.map((err: any) => toast.error(err));
                }
            });
    }, [moviesId])

    return (
        <ContainerMovies>

            {
                foundMovie.map((movie: any, index) =>
                (

                    <CardMovie
                        key={index}
                        data={movie}
                        movieFavorited={moviesId.includes(movie.id)}
                    />
                )
                )
            }
        </ContainerMovies>
    );
}