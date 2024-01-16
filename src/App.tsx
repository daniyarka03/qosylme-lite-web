import './App.css'
import { NextUIProvider } from "@nextui-org/react";
import HomePage from "./screens/HomePage/HomePage";
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import EventListPage from "./screens/EventListPage/EventListPage";
import Navbar from "./components/Navbar/NavbarComponent";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import EventPage from "./screens/EventPage/EventPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

function App() {

    const token = localStorage.getItem('token');


    const errorLink = onError(({ graphQLErrors, networkError }) => {
        // Обработка ошибок GraphQL
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                );
            });
        }

        // Обработка ошибок сети
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            errorLink,
            new HttpLink({
                uri: import.meta.env.VITE_SERVER_URL_GRAPHQL,
                credentials: 'include',
            }),
        ]),
    });

    return (
        <ApolloProvider client={client}>
            <NextUIProvider>
                <NavbarComponent />
                <Router>
                    <Routes>
                        {token ? (
                            <>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/events" element={<EventListPage />} />
                                <Route path="/event/:id" element={<EventPage />} />
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path={"*"} element={<LoginPage />} />
                            </>
                        )}
                    </Routes>
                </Router>
            </NextUIProvider>
        </ApolloProvider>
    );
}

export default App;
