import { Box } from "@mui/material";
import React, { useState } from "react"
import s from '../../styles/DictionaryCard.module.scss'
import { DictionaryCard } from "./DictionaryCard";


interface Props {

}

export const DictionaryCards: React.FC<Props> = ({ }) => {

    const [cards, setCards] = useState(["Some", "Title", "omit"])

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', columnGap: '50px', rowGap: '20px', flexWrap: 'wrap' }}>
                {
                    cards.map((el,i) => {
                        return <DictionaryCard key={i} title={el} />
                    })
                }

            </Box>
        </>
    )
};

