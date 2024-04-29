import React from "react"
import { Typography, Box, Card, CardContent, CardMedia, Link } from "@mui/material";

const ResLinkCard = ({ link, image, title, description }) => {
    return (
        <Link
            underline="none"
            href={link}
            target="_blank"
            rel="noopener"
        >
            <Card square variant="outlined">
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                />
                <CardContent sx={{ width: 200, height: 170 }}>
                    <Typography
                        color="primary"
                        sx={{ textDecoration: "underline lightblue" }}
                    >
                        {title}
                    </Typography>

                    <Typography>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

const ResLinkCards = () => {
    return (
        <Box
            width="100vw"
            height="300px"
            sx={{ backgroundColor: "#0E2728", margin: 5 }}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <ResLinkCard
                link={"https://www.aspca.org/pet-care/dog-care/general-dog-care"}
                image={"https://www.aspca.org/sites/default/files/dog-care_general-dog-care_main-image.jpg"}
                title={"General Dog Care"}
                description={"A beginner's guide to preparing and caring for a dog."}
            />

            <ResLinkCard
                link={"https://www.aspca.org/pet-care/cat-care/general-cat-care"}
                image={"https://www.aspca.org/sites/default/files/cat-care_general-cat-care_body1-right.jpg"}
                title={"General Cat Care"}
                description={"A beginner's guide to preparing and caring for a cat."}
            />

            <ResLinkCard
                link={"https://www.petfinder.com/other-pets/small-and-furry-pets/facts-small-mammal-pets/"}
                image={"https://www.petfinder.com/static/e801888dd7dc3c3a735547036e840078/5a4d9/hamster-facts-about-small-mammals-as-pets-thinkstock-155233157-253x168_0.webp"}
                title={"Facts About Small Mammals as Pets"}
                description={"A guide for those smaller furry friends, complete with a handy characteristics chart."}
            />

            <ResLinkCard
                link={"https://vetericyn.com/blog/reptile-care-for-beginners-a-helpful-guide/"}
                image={"https://vetericyn.com/Vetericyn/wp-content/uploads/2020/10/Small-pet-tortoise-eating-lettuce-in-a-pet-shop-tank.jpg"}
                title={"Reptile Care for Beginners: A Helpful Guide"}
                description={"A comprehensive yet approachable beginner's guide to caring for your reptile friend(s)."}
            />
        </Box>
    )
}

export default ResLinkCards