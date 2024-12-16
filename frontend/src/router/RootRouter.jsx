import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthUserToken} from '../store/selectors/index.js';
import AuthPage from "../pages/AuthPage.jsx";
import UserAccount from "../pages/UserAccount.jsx";
import EditAccount from "../pages/EditAccount.jsx";
import Toolbar from "../components/molecules/Toolbar/Toolbar.jsx";
import NewPostPage from "../pages/NewPostPage.jsx";
import Home from "../pages/Home.jsx";
import Awards from "../pages/Awards.jsx";
import EditUserPassword from "../pages/EditUserPassword.jsx";
import Saved from "../pages/Saved.jsx";
import SearchPage from "../pages/SearchPage.jsx";

const ProtectedRoute = ({children}) => {
    const isUser = Boolean(useSelector(selectAuthUserToken));
    return isUser ? children : <Navigate to="/" />;
};

const RootRouter = () => {
    const isUser = Boolean(useSelector(selectAuthUserToken));

    return (
        <>
            <Routes>
                <Route path="/" element={<AuthPage />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <SearchPage />
                        </ProtectedRoute>
                    }
                />

                {/*<Route*/}
                {/*    path="/profile"*/}
                {/*    element={*/}
                {/*        <ProtectedRoute>*/}
                {/*            <UserAccount />*/}
                {/*        </ProtectedRoute>*/}
                {/*    }*/}
                {/*/>*/}

                <Route
                    path="/:userId"
                    element={
                        <ProtectedRoute>
                            <UserAccount />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/edit"
                    element={
                        <ProtectedRoute>
                            <EditAccount />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/edit/password"
                    element={
                        <ProtectedRoute>
                            <EditUserPassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/new-post"
                    element={
                        <ProtectedRoute>
                            <NewPostPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/awards"
                    element={
                        <ProtectedRoute>
                            <Awards />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/saved"
                    element={
                        <ProtectedRoute>
                            <Saved />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {isUser && <Toolbar />}
        </>
    );
};

export default RootRouter;
