import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenuItem, NavbarMenu, Image
} from "@nextui-org/react";
import Logo from '../../assets/logo.png';

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "My Settings",
        "Log Out",
    ];

    const token = localStorage.getItem('token');
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Image src={Logo} style={{height: "48px", width: "auto"}}/>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem  isActive={location.pathname === '/'}>
                    <Link color={location.pathname === '/' ? 'primary' : 'foreground'} href="/">
                        Главная
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === '/events'}>
                    <Link color={location.pathname === '/events' ? 'primary' : 'foreground'} href="/events" aria-current="page">
                        Мероприятия
                    </Link>
                </NavbarItem>
                <NavbarItem  isActive={location.pathname === '/integrations'}>
                    <Link color={location.pathname === '/integrations' ? 'primary' : 'foreground'} href="#">
                        Моменты
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {token ? (
                    <NavbarItem>
                        <Link href="/profile">
                            <Button color="primary" className="font-bold">
                                Профиль
                            </Button>
                        </Link>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Войти в аккаунт</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat">
                                Регистрация
                            </Button>
                        </NavbarItem>
                    </>
                )
                }
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/">Home</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/events">Event</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default NavbarComponent;