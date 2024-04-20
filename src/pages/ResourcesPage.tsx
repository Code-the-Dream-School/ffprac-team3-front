import React from "react";
import { Typography, Box, Card, CardContent, CardMedia, Link } from "@mui/material";
import ResHeroBanner from "../components/ResHeroBanner";
import FAQ from "../components/FAQ";
import ChecklistCards from "../components/ChecklistCards";

const ResourceCards = () => {
    return (
        <Box
            width="100vw"
            height="300px"
            sx={{ backgroundColor: "#0E2728", margin: 5 }}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Link
                underline="none"
                href="https://www.aspca.org/pet-care/dog-care/general-dog-care"
                target="_blank"
                rel="noopener"
            >
                <Card square variant="outlined">
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.aspca.org/sites/default/files/dog-care_general-dog-care_main-image.jpg"
                    />
                    <CardContent sx={{ width: 200, height: 170 }}>
                        <Typography color="primary" sx={{ textDecoration: "underline lightblue" }}>General Dog Care</Typography>
                        <Typography>A beginner's guide to preparing and caring for a dog.</Typography>
                    </CardContent>
                </Card>
            </Link>

            <Link
                underline="none"
                href="https://www.aspca.org/pet-care/cat-care/general-cat-care"
                target="_blank"
                rel="noopener"
            >
                <Card square variant="outlined">
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.aspca.org/sites/default/files/cat-care_general-cat-care_body1-right.jpg"
                    />
                    <CardContent sx={{ width: 200, height: 170 }}>
                        <Typography color="primary" sx={{ textDecoration: "underline lightblue" }}>General Cat Care</Typography>
                        <Typography>A beginner's guide to preparing and caring for a cat.</Typography>
                    </CardContent>
                </Card>
            </Link>

            <Link
                underline="none"
                href="https://www.petfinder.com/other-pets/small-and-furry-pets/facts-small-mammal-pets/"
                target="_blank"
                rel="noopener"
            >
                <Card square variant="outlined">
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.petfinder.com/static/e801888dd7dc3c3a735547036e840078/5a4d9/hamster-facts-about-small-mammals-as-pets-thinkstock-155233157-253x168_0.webp"
                    />
                    <CardContent sx={{ width: 200, height: 170 }}>
                        <Typography color="primary" sx={{ textDecoration: "underline lightblue" }}>Facts About Small Mammals as Pets</Typography>
                        <Typography>A guide for those smaller furry friends, complete with a handy characteristics chart.</Typography>
                    </CardContent>
                </Card>
            </Link>

            <Link
                underline="none"
                href="https://vetericyn.com/blog/reptile-care-for-beginners-a-helpful-guide/"
                target="_blank"
                rel="noopener"
            >
                <Card square variant="outlined">
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://vetericyn.com/Vetericyn/wp-content/uploads/2020/10/Small-pet-tortoise-eating-lettuce-in-a-pet-shop-tank.jpg"
                    />
                    <CardContent sx={{ width: 200, height: 170 }}>
                        <Typography color="primary" sx={{ textDecoration: "underline lightblue" }}>Reptile Care for Beginners: A Helpful Guide</Typography>
                        <Typography>A comprehensive yet approachable beginner's guide to caring for your reptile friend(s).</Typography>
                    </CardContent>
                </Card>
            </Link>
        </Box>
    )
}

const ResourcesPage = () => {
    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <ResHeroBanner />
            <ResourceCards />
            <ChecklistCards />
            <FAQ />
        </Box>

    )
}

export default ResourcesPage