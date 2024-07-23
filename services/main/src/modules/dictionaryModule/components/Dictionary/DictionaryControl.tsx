import { Box } from "@mui/material";
import React from "react"
import { useDispatch } from "react-redux";
import { removeSelectedItems, setSelectAllMode, setSelectMode } from "../../state/dictionary.reducer";
import { useSelector } from "react-redux";
import { isSelectedAllMode, selectMode } from "../../state/selectors";

interface Props {

}

export const DictionaryControl: React.FC<Props> = ({ }) => {
    const dispatch = useDispatch()
    const selectedMode = useSelector(selectMode)
    const selectedAllMode = useSelector(isSelectedAllMode)


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box onClick={() => dispatch(setSelectMode(!selectedMode))}>Select</Box>
                {selectedMode && <Box sx={{ textDecoration: selectedAllMode ? 'underline' : 'none' }} onClick={() => dispatch(setSelectAllMode())}>All</Box>}
                <Box onClick={() => dispatch(removeSelectedItems())}>Delete</Box>
            </Box>
        </>
    )
};

