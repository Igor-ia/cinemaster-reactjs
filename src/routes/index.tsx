import { Routes as Switch, Route } from 'react-router-dom';
import { AddedMovies } from '../pages/auth/AddedMovies';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { Favorites } from '../pages/Favorites';
import { Home } from '../pages/Home';
import { SearchMovies } from '../pages/SearchMovies';

export default function Routes() {
    return (
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/search' element={<SearchMovies />} />
            <Route path='/added' element={<AddedMovies />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Switch>
    )
}