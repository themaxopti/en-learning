import React from "react"
import { Box } from "@mui/material";


interface Props {

}

export const UserLogo: React.FC<Props> = ({ }) => {
    return (
        <>
            <Box sx={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                background: 'red',
                cursor:'pointer'
            }}>

            </Box>
        </>
    )
};

