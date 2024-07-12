import { Box, Button } from "@mui/material";
import React from "react"
import { DictionaryCards } from "../../components/DictionaryCards/DictionaryCards";

interface Props {

}

export const DicitionaryListPage: React.FC<Props> = ({ }) => {
    return (
        <>
            <Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <h1>Select dictionary</h1>
                    <Button sx={{height:'40px'}} variant="contained">Create dictionary</Button>
                </Box>
                <DictionaryCards />
            </Box>
        </>
    )
};

