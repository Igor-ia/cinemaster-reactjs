import { get } from "lodash";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Movies } from "../pages/Home";
import axios from "../services/axios";


type SubmitProps = {
    title: string;
    synopsis: string;
    rate: number;
    poster: string;

}
interface Props {
    addMovieOnList: (movie: Movies) => void;
    show: any;
    onHide: any;
}

export function AddMovieModal({ addMovieOnList, ...props }: Props) {
    const navigate = useNavigate();
    const { id: creatorId } = useSelector((state: any) => state.auth.user);
    const { register, handleSubmit, } = useForm<SubmitProps>();


    const onSubmit = async (data: SubmitProps) => {
        const { title, synopsis, rate, poster } = data;

        try {
            const { data: movieAdded } = await axios.post('/movies/add', {
                creatorId,
                title,
                synopsis,
                rate: String(rate),
                poster
            });
            addMovieOnList(movieAdded);
            toast.success('Movie has created!')
            props.onHide();
        } catch (error) {
            const errors = get(error, 'response.data.errors', []) as [];
            const status = get(error, 'response.status', 0) as number;

            if (status === 401) {
                toast.warn('You need to login again')
                return navigate('/login');
            }

            if (errors.length > 0) {
                errors.map((err: any) => toast.error(err))
            }


        }
    };


    const onSubmitError = (errors: any) => {
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key].message)
            }
        }

    };


    return (
        <Modal
            {...props}

            centered
        >
            <Modal.Header closeButton>
                <h2>Add Movie</h2>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit, onSubmitError)} className=" d-flex flex-column gap-2">
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            {...register('title', { required: "Title is required" })}
                            type="text"
                            placeholder="Title"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Synopsis</Form.Label>
                        <Form.Control
                            {...register('synopsis', { required: 'Synopsis is required' })}
                            type="text"
                            placeholder="Synopsis"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Rate</Form.Label>

                        <Form.Control
                            {...register('rate', {
                                required: 'Rating is required',
                                min: { value: 1, message: 'Lowest rating that can be given is 1' },
                                max: { value: 10, message: 'Highest rating that can be given is 10' }
                            })}
                            type="number"
                            step="0.1"
                            min='1'
                            max='10'
                            placeholder="Rate"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Movie Poster</Form.Label>
                        <Form.Control
                            {...register('poster', { required: 'Poster URL is required' })}
                            type="text"
                            placeholder='URL Poster'
                        />
                    </Form.Group>


                    <footer className='d-flex'>
                        <div className="ms-auto">
                            <Button type="submit" variant='success'>Confirm</Button>
                        </div>
                    </footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}