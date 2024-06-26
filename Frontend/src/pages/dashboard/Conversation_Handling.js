import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";


import DasHeader from "../../components/Conversation/DasHeader";
import DasFooter from "../../components/Conversation/DasFooter";



import useResponsive from "../../hooks/useResponsive";

import { Chat_History } from "../../data";

import {
    TimeSeparation, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg
} from "../../components/Conversation/MessageType";

import { useDispatch, useSelector } from "react-redux";

import {
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../Redux/Slice/Conversation";


import { socket } from "../../socket";



const Conversation_Handling = ({ isMobile, menu }) => {
    const dispatch = useDispatch();

    const { conversationList, current_message } = useSelector(
        (state) => state.conversation.direct_chat
    );

    const { room_id } = useSelector((state) => state.appe);


    console.log("all data->>", conversationList, "\n", "current_message", current_message, "\n", "roo->id", room_id, "\n");



    useEffect(() => {

        const current = conversationList.find((el) => el?.id === room_id);

        console.log("cur->>>", current);

        socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
            // data => list of messages
            console.log(data, "List of messages");
            dispatch(FetchCurrentMessages({ messages: data }));
        });

        dispatch(SetCurrentConversation(current));
    }, []);


    return (
        <Box p={isMobile ? 1 : 3}>
            <Stack spacing={3}>
                {current_message?.map((el, idx) => {
                    switch (el.type) {
                        case "divider":
                            return (
                                // Timeline
                                <TimeSeparation key={idx} el={el} />
                            );

                        case "msg":
                            switch (el.subtype) {
                                case "media":
                                    return (
                                        // Media Message
                                        <MediaMsg el={el} key={idx} menu={menu} />
                                    );

                                case "doc":
                                    return (
                                        // Doc Message
                                        <DocMsg el={el} key={idx} menu={menu} />
                                    );
                                case "Link":
                                    return (
                                        //  Link Message
                                        <LinkMsg el={el} key={idx} menu={menu} />
                                    );

                                case "reply":
                                    return (
                                        //  ReplyMessage
                                        <ReplyMsg el={el} key={idx} menu={menu} />
                                    );

                                default:
                                    return (
                                        // Text Message
                                        <TextMsg el={el} key={idx} menu={menu} />
                                    );
                            }

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    );
};

const ChatComponent = () => {
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const theme = useTheme();

    const messageListRef = useRef(null);

    const { current_message } = useSelector(
        (state) => state.conversation.direct_chat
    );

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_message]);

    return (
        <Stack
            height={"100%"}
            maxHeight={"100vh"}
            width={isMobile ? "100vw" : "auto"}
        >
            {/*  */}
            <DasHeader />
            <Box
                ref={messageListRef}
                width={"100%"}
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflow: "scroll",

                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F0F4FA"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <SimpleBarStyle timeout={500} clickOnTrack={false}>
                    <Conversation_Handling menu={true} isMobile={isMobile} />
                </SimpleBarStyle>
            </Box>

            {/*  */}
            <DasFooter />
        </Stack>
    );
};

export default ChatComponent;

export { Conversation_Handling };
