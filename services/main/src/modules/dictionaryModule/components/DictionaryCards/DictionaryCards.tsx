import { Box } from "@mui/material";
import React, { useState } from "react"
import s from '../../styles/DictionaryCard.module.scss'
import { DictionaryCard } from "./DictionaryCard";


interface Props {

}

export const DictionaryCards: React.FC<Props> = ({ }) => {

    const [cards, setCards] = useState([1, 2, 3, 4, 5, 6])

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', columnGap: '50px', rowGap: '20px', flexWrap: 'wrap' }}>
                {
                    cards.map((el) => {
                        return <DictionaryCard />
                    })
                }

            </Box>
        </>
    )
};

