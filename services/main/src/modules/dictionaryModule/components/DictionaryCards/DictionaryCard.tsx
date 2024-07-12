import { Box } from "@mui/material";
import React from "react"
import s from '../../styles/DictionaryCard.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface Props {

}

export const DictionaryCard: React.FC<Props> = ({ }) => {
    return (
        <>
            <Card sx={{ maxWidth: 275, width: '100%' }}>
                <CardContent>
                    <Box>Title</Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Open</Button>
                </CardActions>
            </Card>
        </>
    )
};

