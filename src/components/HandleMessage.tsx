import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cleanMessage, ICleanMessage, ILanguage } from '../redux/action';
import { IMessage } from '../redux/reducer';
import { IStateRedux } from '../redux/store';

interface IHandleMessageProps {
    language: ILanguage;
    show?: boolean;
    message?: IMessage;
    cleanMessage: ICleanMessage;
}

interface IHandleMessageWrapper { error?: boolean; }
interface IMessageTitle { error?: boolean; }
interface IHr { error?: boolean; }

const HandleMessageWrapper = styled.div<IHandleMessageWrapper>`
    position: fixed;
    width: 15%;
    min-height: 12%;
    background-color: ${({ error }) => error ? "#ffc2c2" : "#94ffb9"};
    border: 2px solid ${({ error }) => error ? "#a00202" : "#02a044"};
    border-radius: 5px;
    color: ${({ error }) => error ? "#a00202" : "#02a044"};
    right: 20px;
    top: 20px;
    padding: 15px;
    box-sizing: border-box;
    z-index: 99999999;
`;

const MessageTitle = styled.h2<IMessageTitle>`
    color: ${({ error }) => error ? "#a00202" : "#02a044"};
    margin: 0 0 0px 0;
    font-size: 1.25rem;
    font-weight: bold;
`;

const Hr = styled.hr<IHr>`
    margin: 5px 0 10px 0;
    border: 1px solid ${({ error }) => error ? "#a00202b7" : "#02a044b7"};
`;

const HandleMessage: NextPage<IHandleMessageProps> = ({ language, show, message, cleanMessage }) => {
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                cleanMessage();
            }, 3000);
        }
    }, [show]);

    return show && message
        ? (
            <HandleMessageWrapper error={message?.type === "Error"}>
                <MessageTitle error={message?.type === "Error"}>
                    {message?.type}
                </MessageTitle>
                <Hr error={message?.type === "Error"} />
                {message?.message}
            </HandleMessageWrapper>
        )
    : <></>;
}

const mapStateToProps = (state: IStateRedux) => ({
    language: state.language.language,
    show: state.message.show,
    message: state.message.message
});

const mapDispatchToProps = ({ cleanMessage });

export default connect(mapStateToProps, mapDispatchToProps)(HandleMessage);