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
            <Accordion
                disableGutters
                elevation={0}
                
                sx={{
                    backgroundColor: "transparent",
                    mx:5,
                    '&:before': {
                        display: 'none',
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={<KeyboardArrowDown />}
                    sx={{ flexDirection: "row-reverse" }}
                    
                >
                    <Typography
                        fontWeight="bold"
                        variant="h6"
                        pl={2}
                        color={"#EE633E"}
                    >
                        {question}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{backgroundColor:"rgb(248, 175, 63, .2)", borderRadius:3}}>
                    <Typography pl={5} variant="h6">{answer}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

const FAQ = () => {
    return (
        <>
            <Typography
                variant="h3"
                textAlign="center"
                my={4}
                sx={{ letterSpacing: .5, fontWeight: 600 }}
            >
                Do you have questions?
            </Typography>

            <Box pb={10} my={3}>

                    <FAQAccordion
                        question={"Am I ready to adopt a pet?"}
                        answer={"We're glad you asked! Please check out the guides provided above on preparing and caring for the most common pet types."}
                    />

                    <FAQAccordion
                        question={"Does PetPals cost anything?"}
                        answer={"No, PetPals is completely free to use. Adoption fees for pets depend on the adoption clinic, breeder, or individual adopting out the pet. Fees may be higher depending on the type of animal and can also be affected by factors such as how much and what kind of care the animal has already received, such as medication, surgery, or other veterinary treatment. We never add our own fees nor do we receive compensation for pet adoptions. We are truly doing this for the animals!... and those that love them."}
                    />

                    <FAQAccordion
                        question={"I have a question about a specific pet..."}
                        answer={"Please contact the adoption agency, breeder, or individual adopting out the pet. PetPals makes it super easy to do this!"}
                    />

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

            </Box >
        </>
    )
}

export default FAQ