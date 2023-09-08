import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { CHANNEL_TYPE, CHANNEL_TITLE } from '@/configs/constant/channel'
import { ChannelModalRefType } from '../ChannelModal/ChannelModal'
import serverAPI from '@/api/severApi'
import channelAPI from '@/api/channelApi'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import ChannelIcon from '../ChannelIcon/ChannelIcon'
import ChannelModal from '../ChannelModal/ChannelModal'

import './styles.scss'

const Channel: React.FC = (): JSX.Element => {
    const [server, setServer] = useState<IServer | null>(null)
    const [channels, setChannels] = useState<IChannel[]>([])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const modalRef = useRef<ChannelModalRefType>(null)

    const { serverId } = useParams()

    useQuery<IServer, Error>({
        queryKey: ['getServerByServerId', serverId],
        queryFn: async () => {
            return await serverAPI.getServerByServerId(serverId)
        },
        enabled: !!serverId,
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setServer(res)
        },
    })
    useQuery<IChannel[], Error>({
        queryKey: ['getChannelByServerId', serverId],
        queryFn: async () => {
            return await channelAPI.getAllChannelByServer(serverId)
        },
        enabled: !!serverId,
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setChannels(res)
        },
    })

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const textChannels = channels?.filter(
        (channel) => channel.type === CHANNEL_TYPE.TEXT
    )
    const audioChannels = channels?.filter(
        (channel) => channel.type === CHANNEL_TYPE.AUDIO
    )
    const videoChannels = channels?.filter(
        (channel) => channel.type === CHANNEL_TYPE.VIDEO
    )
    // const members = server?.members.filter((member) => member.userId !== profile.id)

    const rederChannel = (listChannels: IChannel[], type: string) => {
        return listChannels.map((channel) => {
            return (
                <NavLink
                    to={`${serverId}/channel/${channel._id}`}
                    key={channel._id}
                    className={({ isActive }) =>
                        `channel-item ${isActive ? 'active' : 'inactive'} `
                    }
                >
                    <ChannelIcon type={type.toLowerCase() as ChannelType} />
                    <p>{channel.name}</p>
                </NavLink>
            )
        })
    }

    const renderChannelContainer = (
        listChannels: IChannel[] | undefined,
        type: string
    ) => {
        if (!!listChannels?.length) {
            return (
                <div className="channel-container__main-box">
                    <div className="channel-container__main-box__header">
                        <h4>{CHANNEL_TITLE[type]}</h4>
                        <span onClick={() => modalRef.current?.onOpen()}>
                            <AddOutlinedIcon fontSize="small" />
                        </span>
                    </div>
                    {rederChannel(listChannels, type)}
                </div>
            )
        }
    }

    const handleAddChannel = (data: IChannel) => {
        setChannels([...channels, data])
    }

    return (
        <>
            <div className="channel-container">
                {!!server && (
                    <>
                        <div
                            className="channel-container__header"
                            onClick={handleClick}
                        >
                            <h3>{server?.name}</h3>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="channel-container__main">
                            {renderChannelContainer(
                                textChannels,
                                CHANNEL_TYPE.TEXT
                            )}
                            {renderChannelContainer(
                                audioChannels,
                                CHANNEL_TYPE.AUDIO
                            )}
                            {renderChannelContainer(
                                videoChannels,
                                CHANNEL_TYPE.VIDEO
                            )}
                        </div>
                    </>
                )}
            </div>
            <MenuDropdown
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleAddChannel={handleAddChannel}
            />
            <ChannelModal ref={modalRef} addChannel={handleAddChannel} />
        </>
    )
}

export default Channel
