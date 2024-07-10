import React, {useEffect} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenuItem, NavbarMenu, Image, Avatar
} from "@nextui-org/react";
import Logo from '../../assets/Logo.png';
import HomeIcon from "../../assets/Iconly/Regular/Bold/Home.svg";
import {useInfoProfile} from "../../hooks/useInfoProfile";

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "My Settings",
        "Log Out",
    ];
    const infoProfile = useInfoProfile();
    const [user, setUser] = React.useState<any>();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (infoProfile) {
            setUser(infoProfile);
        }
    }, []);
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
                        {/*<img src={HomeIcon} /> Home*/}
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === '/events'}>
                    <Link color={location.pathname === '/events' ? 'primary' : 'foreground'} href="/events" aria-current="page">
                        Events
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === '/partners'}>
                    <Link color={location.pathname === '/partners' ? 'primary' : 'foreground'} href="/partners" aria-current="page">
                        Partners
                    </Link>
                </NavbarItem>
                {token ? (
                    <>
                <NavbarItem  isActive={location.pathname === '/challenges'}>
                    <Link color={location.pathname === '/challenges' ? 'primary' : 'foreground'} href="/challenges">
                        Challenges
                    </Link>
                </NavbarItem>
                <NavbarItem  isActive={location.pathname === '/notifications'}>
                    <Link color={location.pathname === '/notifications' ? 'primary' : 'foreground'} href="/notifications">
                        Notifications
                    </Link>
                </NavbarItem>
                    </>
                    ) : null}
            </NavbarContent>
            <NavbarContent justify="end">
                {token ? (
                    <NavbarItem>
                        <Link href="/profile" style={{backgroundColor: "#eee", borderRadius: "50px", paddingLeft: "20px", height: "40px"}}>
                            {infoProfile  && (
                                <>
                                    <p style={{fontSize: "14px", marginRight: "20px", color: "#000"}}>{infoProfile.firstname + " " + infoProfile.lastname}</p>
                                    <Avatar style={{height: "40px", width: "40px"}} src={import.meta.env.VITE_SERVER_URL + infoProfile.avatar} />
                                </>
                            )}
                            {/*<Avatar src={infoProfile.avatar} />*/}
                            {/*<Button color="primary" className="font-bold">*/}
                            {/*    Profile*/}
                            {/*</Button>*/}
                        </Link>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat">
                                Register
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
