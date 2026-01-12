import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"

interface Props {
    children:ReactNode
}

export const StackHeader = ( {children}:Props ) => { 
    return (
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', bgcolor: 'var(--Color-greyscale-100)',height:48, m:0}}>
            <Typography variant="subtitle2" color="text.secondary">
                {children}
            </Typography>
        </Box>
    )
}