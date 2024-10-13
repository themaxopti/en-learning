import { alertErrorSelector } from "@packages/shared/src/modules/errorModule";
import React from "react"
import { useSelector } from "react-redux";

interface Props {

}

export const Test: React.FC<Props> = ({ }) => {
    const error = useSelector(alertErrorSelector)

    return (
        <>
            <div>
                {error}
            </div>
        </>
    )
};

