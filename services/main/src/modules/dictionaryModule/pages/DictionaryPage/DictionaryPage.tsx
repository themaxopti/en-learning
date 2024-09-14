import { Box } from "@mui/material";
import React from "react"
import { AddWordForm } from "../../components/Form/AddWordForm";
import { WrapperContainer } from "@packages/shared/src/components/wrapper/Wrapper/WrapperContainer";
import s from '../../styles/DictionaryPage.module.scss'
import { Dictionary } from "../../components/Dictionary/Dictionary";

interface Props {

}

export const DictionaryPage: React.FC<Props> = ({ }) => {
    return (
        <>
            <WrapperContainer fullHeight>
                <Box className={s.dictionary}>
                    <Box className={s.dictionary__form}>
                        <h2>Dictionary title</h2>
                        <AddWordForm />
                    </Box>
                    <Dictionary />
                </Box>
            </WrapperContainer>
        </>
    )
};

