import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import { KeyboardArrowDown, Margin } from "@mui/icons-material";

const FAQAccordion = ({ question, answer }) => {
    return (
        <>
            <Accordion disableGutters sx={{margin:1}}>
                <AccordionSummary
                    expandIcon={<KeyboardArrowDown />}
                    sx={{margin:3}}
                >
                    <Typography>{question}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography>{answer}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

const FAQ = () => {
    return (
        <>
            <Typography
                variant="h2"
                textAlign="center"
                my={4}
            >
                FAQ
            </Typography>

            <Box display="flex" pb={10} my={3}>

                <Box display="flex" flexDirection="column">
                    <FAQAccordion
                        question={"Am I ready to adopt a pet?"}
                        answer={"We're glad you asked! Check out the Pet Readiness Checklists above for more information."}
                    />

                    <FAQAccordion
                        question={"Does PetPals cost anything?"}
                        answer={"No, PetPals is completely free to use."}
                    />

                    <FAQAccordion
                        question={"I have a question about a specific pet..."}
                        answer={"Please contact the adoption agency or breeder. PetPals makes it super easy to do this!"}
                    />
                </Box>

                <Box display="flex" flexDirection="column" >
                    <FAQAccordion
                       question={"Am I ready to adopt an animal?"}
                       answer={"We're glad you asked! Check out the Pet Readiness Checklists above for more information."}
                    />

                    <FAQAccordion
                        question={"I have a pet for adoption. Can I make a listing on your website?"}
                        answer={"Coming soon..."}
                    />

                    <FAQAccordion
                        question={"Do you have any axolotls?"}
                        answer={"Answer..."}
                    />
                </Box>

            </Box >
        </>
    )
}

export default FAQ