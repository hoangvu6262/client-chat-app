import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useUser } from '@clerk/clerk-react'

import memberAPI from '@/api/memberApi'
import { MEMBER_ROLE } from '@/configs/constant/member'

type Props = {}

const InvitePage: React.FC<Props> = (props) => {
    const { serverId } = useParams()
    const { user } = useUser()

    const navigate = useNavigate()

    if (!serverId) {
        navigate('/')
    }

    const handleEcceptInvite = async () => {
        await memberAPI.addNewMemberToServer({
            role: MEMBER_ROLE.GUEST,
            serverId,
            userId: user?.id,
        })
        navigate(`/server/${serverId}`)
    }

    const handleEjectInvite = () => {
        navigate('/')
    }

    return (
        <Container maxWidth="sm" className="invite-container">
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Typography variant="subtitle1">
                        Do you want to join this server?
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Button type="button" onClick={handleEcceptInvite}>
                        Eccept
                    </Button>
                    <Button type="button" onClick={handleEjectInvite}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default InvitePage
