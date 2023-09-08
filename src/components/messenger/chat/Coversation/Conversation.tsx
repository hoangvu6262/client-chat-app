import React from 'react'
import ChatInput from '../ChatInput/ChatInput'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined'
import MissedVideoCallOutlinedIcon from '@mui/icons-material/MissedVideoCallOutlined'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import { CHANNEL_TYPE } from '@/configs/constant/channel'
import channelAPI from '@/api/channelApi'

import './styles.scss'

type Props = {}

const Conversation: React.FC<Props> = (): JSX.Element => {
    const { channelId } = useParams()

    const { data } = useQuery<IChannel, Error>({
        queryKey: ['getChannelByChannelId', channelId],
        queryFn: async () => {
            return await channelAPI.getChannelByChannelId(channelId)
        },
        enabled: !!channelId,
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess(data) {},
    })

    const renderChannelIcon = (type: string | undefined) => {
        switch (type) {
            case CHANNEL_TYPE.AUDIO:
                return <KeyboardVoiceOutlinedIcon />
            case CHANNEL_TYPE.VIDEO:
                return <MissedVideoCallOutlinedIcon />
            default:
                return <ClearAllIcon />
        }
    }

    return (
        <div className="conversation-container">
            <div className="conversation-container__header">
                {renderChannelIcon(data?.type)}
                <h3>{data?.name}</h3>
            </div>
            <div className="conversation-container__main"></div>
            <ChatInput />
        </div>
    )
}

export default Conversation
