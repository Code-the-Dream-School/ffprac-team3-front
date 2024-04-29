import React from "react";
import { Box } from "@mui/material";
import ResHeroBanner from "../components/ResHeroBanner";
import ResLinkCards from "../components/ResLinkCards";
import FAQ from "../components/FAQ";


const ResourcesPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <ResHeroBanner />
            <ResLinkCards />
            <FAQ />
        </Box>
    )
}

export default ResourcesPage