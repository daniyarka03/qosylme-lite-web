import './App.css'
import { setupIonicReact } from '@ionic/react';
import { NextUIProvider } from "@nextui-org/react";
import HomePage from "./screens/HomePage/HomePage";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import EventListPage from "./screens/EventListPage/EventListPage";
import Navbar from "./components/Navbar/NavbarComponent";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import EventPage from "./screens/EventPage/EventPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import CreateEventPage from "./screens/CreateEventPage/CreateEventPage";
import UpdateEventPage from "./screens/UpdateEventPage/UpdateEventPage";
import SettingsPage from "./screens/SettingsPage/SettingsPage";
import EditProfilePage from "./screens/EditProfilePage/EditProfilePage";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import style from "./components/CardEvent/CardEvent.module.css";
import LocationIcon from "./assets/Location.svg";
import ArrowIcon from "./assets/arrow.svg";
import NotificationsPage from "./screens/NotificationsPage/NotificationsPage";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';

setupIonicReact();

function App() {

    const token = localStorage.getItem('token');
    const [isMobile, setIsMobile] = useState(false);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };
    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        console.log("IsMobile", isMobile)
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

    console.log("IsMobile", isMobile)


    return (
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <NextUIProvider>

                <Router>
                    {
                        !isMobile && (
                            <NavbarComponent />
                        ) || (
                            <BottomNavbar />
                        )
                    }
                    <Routes>

                        {token ? (
                            <>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/events" element={<EventListPage />} />
                                <Route path="/event/:id" element={<EventPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/profile/edit" element={<EditProfilePage />} />
                                <Route path="/event/create" element={<CreateEventPage />} />
                                <Route path="/event/:id/edit" element={<UpdateEventPage />} />
                                <Route path={"/notifications"} element={<NotificationsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path={"*"} element={<HomePage />} />
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
            </LocalizationProvider>
        </ApolloProvider>
    );
}

export default App;
