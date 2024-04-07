import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const FAQAccordion = ({ question, answer }) => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<KeyboardArrowDown />}
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
                mt={5}
            >
                FAQ
            </Typography>

            <Box display="flex" justifyContent="center">
                <Box>
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


                <Box>
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