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
                        question={"Should I adopt?"}
                        answer={"Answer..."}
                    />

                    <FAQAccordion
                        question={"How do I take care of a Russian Tortoise?"}
                        answer={"Answer..."}
                    />

                    <FAQAccordion
                        question={"Why do cats purr?"}
                        answer={"Answer..."}
                    />
                </Box>

                <Box display="flex" flexDirection="column" >
                    <FAQAccordion
                        question={"What if I want to return my pet?"}
                        answer={"Answer..."}
                    />

                    <FAQAccordion
                        question={"Do parrots speak English?"}
                        answer={"Answer..."}
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