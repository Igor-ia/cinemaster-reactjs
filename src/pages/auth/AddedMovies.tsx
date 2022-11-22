import { get } from "lodash";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CardMovie } from "../../components/CardMovie";
import { ContainerMovies } from "../../components/ContainerMovies";
import axios from "../../services/axios";
import { Movies } from "../Home";

export function AddedMovies() {
    const navigate = useNavigate();
    const [addedMovies, setAddedMovies] = useState<Movies[]>([]);

    const { id: creatorId } = useSelector((state: any) => state.auth.user);


    useEffect(() => {

        axios(`/movies/added/${creatorId}`)
            .then(response => setAddedMovies(response.data))
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
                addedMovies.map((movie, index) => (
                    <CardMovie
                        key={index}
                        data={movie}
                    />
                ))
            }
        </ContainerMovies>
    );
}