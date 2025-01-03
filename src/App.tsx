import './App.css'
import { setupIonicReact } from '@ionic/react';
import { NextUIProvider } from "@nextui-org/react";
import HomePage from "./screens/HomePage/HomePage";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import EventListPage from "./screens/EventListPage/EventListPage";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import EventPage from "./screens/EventPage/EventPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import {ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache, useQuery} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import CreateEventPage from "./screens/CreateEventPage/CreateEventPage";
import UpdateEventPage from "./screens/UpdateEventPage/UpdateEventPage";
import SettingsPage from "./screens/SettingsPage/SettingsPage";
import EditProfilePage from "./screens/EditProfilePage/EditProfilePage";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import NotificationsPage from "./screens/NotificationsPage/NotificationsPage";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import ChallengesPage from "./screens/ChallengesPage/ChallengesPage";
import CheckingValideToken from "./components/CheckingValideToken";
import ChallengePage from "./screens/ChallengePage/ChallengePage";
import { setContext } from '@apollo/client/link/context';
import MomentsPage from "./screens/MomentsPage/MomentsPage";
import LandingPage from "./landing/LandingPage";
import PartnersPage from "./screens/PartnersPage/PartnersPage";
import PartnerMenuPage from "./screens/PartnerMenuPage/PartnerMenuPage";
import PartnersProductPage from "./screens/PartnersProductPage/PartnersProductPage";
import CreateProduct from "./screens/CreateProduct/CreateProduct";

setupIonicReact();

function App() {
    const token = localStorage.getItem('token');
    const SECRET = import.meta.env.VITE_SECRET_KEY;
    const [isMobile, setIsMobile] = useState(false);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };

    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);

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

    const httpLink = new HttpLink({
        uri: import.meta.env.VITE_SERVER_URL_GRAPHQL,
        credentials: 'include',
    });

    const authLink = setContext((_, { headers }) => {
        // Возвращаем объект с заголовками, включая токен
        return {
            headers: {
                ...headers,
                authorization: `${SECRET}` // Добавляем токен в заголовок запроса
            }
        }
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    });

    return (
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <NextUIProvider>

                <Router>
                    <CheckingValideToken />
                    {
                        isMobile && (
                            <BottomNavbar />
                        ) || (
                            <NavbarComponent />
                        )
                    }
                    <Routes>
                        {token ? (
                            <>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/landing" element={<LandingPage />} />
                                <Route path="/events" element={<EventListPage />} />

                                <Route path="/partners" element={<PartnersPage />} />
                                <Route path="/partners/:id" element={<PartnerMenuPage />} />
                                <Route path="/partners/:id/product/:productId" element={<PartnersProductPage />} />
                                <Route path="/partners/:id/product/create" element={<CreateProduct />} />

                                <Route path="/event/:id" element={<EventPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/profile/edit" element={<EditProfilePage />} />
                                <Route path="/event/create" element={<CreateEventPage />} />
                                <Route path="/event/:id/edit" element={<UpdateEventPage />} />
                                <Route path={"/notifications"} element={<NotificationsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path={"*"} element={<HomePage />} />
                                <Route path={"/challenges"} element={<ChallengesPage />} />
                                <Route path={"/challenge/:id"} element={<ChallengePage />} />
                                <Route path={"/moments"} element={<MomentsPage />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<EventListPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path={"*"} element={<LoginPage />} />
                                <Route path="/events" element={<EventListPage />} />
                                <Route path="/event/:id" element={<EventPage />} />
                                <Route path="/event/create" element={<CreateEventPage />} />

                                <Route path="/partners" element={<PartnersPage />} />
                                <Route path="/partners/:id" element={<PartnerMenuPage />} />
                                <Route path="/partners/:id/product/:productId" element={<PartnersProductPage />} />
                            </>
                        )}
                    </Routes>
                </Router>
            </NextUIProvider>
            </LocalizationProvider>
        </ApolloProvider>
    );
}

export default App;
