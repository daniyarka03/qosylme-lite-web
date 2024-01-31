import React from 'react';
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import {Link} from "react-router-dom";
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6bnVsbCwiZXhwIjoxNzA4NTYxOTA2LCJvcmlnSWF0IjoxNzA1OTY5OTA2fQ.uVZCUpcxUsVJ57o84lz2xx6hTTCJ8Lxh97IMHnBC5As
const SettingsPage = () => {
    return (
        <div>
            <Accordion>
                <AccordionItem key="1" aria-label="Accordion 1" title="Account information">
                    <Link to="/profile/edit"><Button color="primary">Edit account info</Button></Link>
                    <Button color="danger">Delete account</Button>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                    2
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                    3
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default SettingsPage;