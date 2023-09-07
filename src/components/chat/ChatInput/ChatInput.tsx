import React, { useState, FormEvent } from 'react'
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import './styles.scss'

type Props = {
    handleSendMsg?: (msg: string) => void
}

const ChatInput: React.FC<Props> = ({ handleSendMsg }): JSX.Element => {
    const [msg, setMsg] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    //   const handleEmojiPickerhideShow = () => {
    //     setShowEmojiPicker(!showEmojiPicker);
    //   };

    const handleEmojiClick = (_event: any, emojiObject: any) => {
        let message = msg
        message += emojiObject.emoji
        setMsg(message)
    }

    const sendChat = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (msg.length > 0) {
            // handleSendMsg(msg);
            setMsg('')
        }
    }

    return (
        <div className="chat-input">
            <form
                className="input-container"
                onSubmit={(event) => sendChat(event)}
            >
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <SendRoundedIcon />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
