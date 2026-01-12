import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"

interface Props {
    children:ReactNode
}

export const SectionHeader = ( {children}:Props ) => { 
    return (
        <Box sx={{px:3, py:3, height:70, bgcolor:'white', position:'sticky', top: 0, borderBottom:'1px solid var(--Color-greyscale-300)', zIndex:2}}>
            <Typography variant="h4">
                {children}
            </Typography>
        </Box>
    )
}