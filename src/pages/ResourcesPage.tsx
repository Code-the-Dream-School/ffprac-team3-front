import React from "react";
import { Typography, Box } from "@mui/material";
import ResHeroBanner from "../components/ResHeroBanner";
import FAQ from "../components/FAQ";
import ChecklistCards from "../components/ChecklistCards";

const ResourcesPage = () => {
    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <ResHeroBanner />
            <ChecklistCards />
            <FAQ />
        </Box>

    )
}

export default ResourcesPage