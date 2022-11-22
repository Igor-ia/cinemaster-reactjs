import { get } from "lodash";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CardMovie } from "../components/CardMovie";
import { ContainerMovies } from "../components/ContainerMovies";
import axios from "../services/axios";
import { Movies } from "./Home";


export function Favorites() {
    const navigate = useNavigate();
    const { id: userId } = useSelector((state: any) => state.auth.user)
    const [favoritedMovies, setFavoritedMovies] = useState<Movies[]>([]);


    useEffect(() => {
        axios(`/favorites/${userId}`)
            .then(response => setFavoritedMovies(response.data))
            .catch(error => {
                const errors = get(error, 'response.data.errors', []) as [];
                const status = get(error, 'response.status', 0) as number;

                if (status === 401) {
                    toast.warn('You need to login again')
                    return navigate('/login');
                }

                if (errors.length > 0) {
                    errors.map((err: any) => toast.error(err));
                }
            });
    }, [])


    return (
        <ContainerMovies>

            {
                favoritedMovies.map(({ movie }: any, index) =>
                (
                    <CardMovie
                        key={index}
                        data={movie}
                        movieFavorited={true}
                    />
                )
                )
            }
        </ContainerMovies>
    );
}