import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material"

const ChecklistCards = () => {
    return (

        <Box
            width="100vw"
            height="300px"
            sx={{ backgroundColor: "#0E2728", margin: 5 }}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Card square variant="outlined">
                <CardContent sx={{ width: 200, height: 170 }}>
                    <Typography>Checklist by pet type</Typography>
                </CardContent>
            </Card>

            <Card square variant="outlined">
                <CardContent sx={{ width: 200, height: 170 }}>
                    <Typography>Checklist by pet type</Typography>
                </CardContent>
            </Card>

            <Card square variant="outlined">
                <CardContent sx={{ width: 200, height: 170 }}>
                    <Typography>Checklist by pet type</Typography>
                </CardContent>
            </Card>

            <Card square variant="outlined">
                <CardContent sx={{ width: 200, height: 170 }}>
                    <Typography>Checklist by pet type</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ChecklistCards