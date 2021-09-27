import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Home from './pages/Home'
import CandidateDetail from './pages/CandidateDetail'
import Favorite from './pages/Favorite'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ToastContainer />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/candidates/:id">
                        <CandidateDetail />
                    </Route>
                    <Route path="/favorites">
                        <Favorite />
                    </Route>
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}
