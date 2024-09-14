import { Box } from "@mui/material";
import React from "react"
import s from '../../styles/DictionaryCard.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


interface Props {
    title:string
}

export const DictionaryCard: React.FC<Props> = ({ title }) => {
    const navigate = useNavigate()
    
    return (
        <>
            <Card sx={{ maxWidth: 275, width: '100%' }}>
                <CardContent>
                    <Box>{title}</Box>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate(`/dictionary/${title}`)} size="small">Open</Button>
                </CardActions>
            </Card>
        </>
    )
};

