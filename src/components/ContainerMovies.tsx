import { Container } from "react-bootstrap";

export function ContainerMovies({ children }: any) {
    return (
        <Container className="my-2 gap-4 d-flex flex-wrap">
            {children}
        </Container>
    );
}