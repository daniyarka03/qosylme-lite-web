import React from 'react';
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6bnVsbCwiZXhwIjoxNzA4NTYxOTA2LCJvcmlnSWF0IjoxNzA1OTY5OTA2fQ.uVZCUpcxUsVJ57o84lz2xx6hTTCJ8Lxh97IMHnBC5As

import "./SettingsPage.css";
const SettingsPage = () => {

    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className="settings-page">
            <Accordion>
                <AccordionItem key="1" aria-label="Accordion 1" title="Account information">
                    <Link to="/profile/edit">
                        <Button
                        color="primary"
                        style={{  width: "100%",
                            height: "70px",
                            fontWeight: "700",
                            fontSize: "20px",
                            borderRadius: "20px",
                            border: "2px solid #fff",
                            marginTop: "10px"
                        }}
                        >Edit profile information</Button>
                    </Link>
                    <Button
                        color="danger"
                        style={{  width: "100%",
                            height: "70px",
                            fontWeight: "700",
                            fontSize: "20px",
                            borderRadius: "20px",
                            border: "2px solid #fff",
                            marginTop: "10px"
                        }}
                    >Delete account</Button>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Privacy settings">
                    2
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title="Appereance">
                    3
                </AccordionItem>
            </Accordion>
            <Button
                onClick={logoutHandler}
                color="danger"
                style={{  width: "100%",
                    height: "70px",
                    fontWeight: "700",
                    fontSize: "20px",
                    borderRadius: "20px",
                    border: "2px solid #fff",
                    marginTop: "40px"
                }}
            >Logout</Button>
            <BottomNavbar />
        </div>
    );
};

export default SettingsPage;