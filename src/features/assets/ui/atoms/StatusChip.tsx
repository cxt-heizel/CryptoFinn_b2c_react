import { Chip, ChipProps } from "@mui/material"
import { PlatformStatus, statusBadges } from '../../model/types';
import styled from '@emotion/styled';


interface Props extends ChipProps {
    status?: PlatformStatus;
    isConnected: boolean;
}

export const StatusChip = ( {status, isConnected}:Props ) => { 
    const statusChip = status ? statusBadges[status] : statusBadges.Normal;
    const sxObj = {
        minWidth: 70,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        fontWeight: 600,
        fontSize: "13px",
        whiteSpace: "nowrap",
    }
    if (!isConnected) {
        return (
            <Chip 
                label='연결대기'
                sx={{
                    bgcolor:'var(--Color-blue-0)',
                    color:'var(--Color-greyscale-800)',
                    ...sxObj
                }}
            />
        )
    }
    return (
        <Chip 
            label={statusChip.label}
            color={statusChip.color}
            sx={{...sxObj}}
        />
    )
}
