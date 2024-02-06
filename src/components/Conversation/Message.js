import React from 'react';
import { Chat_History } from '../../data';
import { Box } from '@mui/material';
import { TimeSeparation, TextMsg, ImgMessage, ReplyMsg, LinkMsg, DocMsg } from '../Conversation/MessageType';

export default function Message() {
    return (
        <Box p={1} >
            {Chat_History.map((element, index) => {

                switch (element.type) {

                    case 'divider':
                        return <TimeSeparation key={index} el={element} />;

                    case 'msg':

                        switch (element.subtype) {

                            case 'img':
                                return <ImgMessage key={index} el={element} />;
                            case 'link':
                                return <LinkMsg key={index} el={element} menu={true} />;
                            case 'doc':
                                return <DocMsg key={index} el={element} menu={true} />;
                            case 'reply':
                                return <ReplyMsg key={index} el={element} />;
                            default:
                                return <TextMsg key={index} el={element} menu={true} />;
                        }

                    default:
                        return <div key={index}></div>; // Provide a unique key for default case

                }

            })}
        </Box>
    );
}
