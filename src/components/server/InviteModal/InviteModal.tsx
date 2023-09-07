import { useImperativeHandle, forwardRef, Ref, useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useParams } from 'react-router-dom'

import CustomModal from '@/components/shared/Modal/Modal'
import useModal from '@/hooks/useModal'
import useOrigin from '@/hooks/useOrigin'

type Props = {}

export type InviteModalRefType = {
    onOpen: (data?: Record<string, any>) => void
}

const InviteModal = (props: Props, ref: Ref<InviteModalRefType>) => {
    const { open, _handleToggle } = useModal()
    const origin = useOrigin()

    const { serverId } = useParams()

    const [copied, setCopied] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        onOpen: _handleToggle,
    }))

    const inviteUrl = `${origin}/invite/${serverId}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    return (
        <CustomModal open={open} handleClose={_handleToggle}>
            <DialogTitle>Server invite link</DialogTitle>
            <DialogContent>
                <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    value={inviteUrl}
                    //   label="Server invite link"
                    name="invite_code"
                    type="text"
                />
                <span onClick={onCopy}>
                    {copied ? <DoneAllIcon /> : <ContentCopyIcon />}
                </span>
                <DialogActions>
                    <Button variant="contained" onClick={_handleToggle}>
                        Cancel
                    </Button>
                </DialogActions>
            </DialogContent>
        </CustomModal>
    )
}

export default forwardRef(InviteModal)
