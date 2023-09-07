import React from 'react'
import Dialog from '@mui/material/Dialog'

type Props = {
    open: boolean
    handleClose: () => void
    children: React.ReactNode
}

const CustomModal: React.FC<Props> = ({ open, handleClose, children }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            {children}
        </Dialog>
    )
}

export default CustomModal
