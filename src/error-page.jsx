import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material"

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)

    return (
        <Box id='error-page'>
            <Typography variant='h1'>Oops!</Typography>
            <Typography variant="subtitle">Sorry, an unexpected error has occured</Typography>
            <Typography variant="subtitle" sx={{fontStyle: 'italic'}}>
                {error.statusText || error.message}
            </Typography>
        </Box>
    )
}