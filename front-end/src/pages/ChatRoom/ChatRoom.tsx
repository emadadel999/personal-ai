import React, { FormEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

import { Message } from "../../types/types";
import Msg from "../../components/msg";
import TextareaAutosize from 'react-textarea-autosize';
import 'simplebar-react/dist/simplebar.min.css';
import { getAnswer } from "../../shared/api-calls/aiApi";

interface ChatRoomProps {
  close: (e?: MouseEvent) => void
}

export default function ChatRoom({ close }: ChatRoomProps) {
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const chatRoomContainer = useRef<HTMLDivElement>(null);
  const formElement = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'a',
      content: 'Hello! How can I assist you today?',
      thinkContent: ''
    }
  ]);

  function sendMsg(e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    let textMsg = '';
    if (chatInput.current) {
      textMsg = chatInput?.current?.value;
      chatInput.current.value = "";
      send(textMsg);
    }
  }

  async function send(msgText: string) {
    setMessages(prevMsgs => [
      ...prevMsgs, 
      { id: uuid(), content: msgText, type: 'q' }
    ]);

    const answerId = uuid();

    let thinking = false;
    for await (const msgChunk of getAnswer(msgText)) {
      setMessages(prevMsgs => {
        if (thinking || msgChunk.includes('<think>')) {
          if (msgChunk.includes('<think>')) {thinking = true; return [...prevMsgs];}
          if (msgChunk.includes('</think>')) {thinking = false; return [...prevMsgs];}
          
          const lastMsg = prevMsgs.findLast(m => m.id === answerId);

          if (lastMsg?.thinkContent) {
            lastMsg.thinkContent = lastMsg.thinkContent.concat(msgChunk);
            return [...prevMsgs];
          } else if (msgChunk) {
            return [
              ...prevMsgs, 
              { id: answerId, type: 'a', thinkContent: msgChunk }
            ];
          } else return [...prevMsgs];
        } else {

          const lastMsg = prevMsgs.findLast(m => m.id === answerId);
          
          if (lastMsg) {
            lastMsg.content = lastMsg.content ? lastMsg.content.concat(msgChunk) : msgChunk;
            return [...prevMsgs];
          } else {
            return [
              ...prevMsgs, 
              { id: answerId, type: 'a', content: msgChunk }
            ];
          }
        }
      })
    }
  };
  
  return (
    <>
      <header className="chat-room__heading">
        <button className="signout__btn" onClick={close}>
          <img src="/images/signout.svg" alt="sign out icon"/>
        </button>
      </header>
        <section className="msgs__container" ref={chatRoomContainer}>
        {messages.map((msg, i) => <Msg msg={msg} isQuestion={msg.type === 'q'} key={i}/>)}
        </section>
        <form ref={formElement} onSubmit={sendMsg} className="texting__container">
            <TextareaAutosize 
              className="chat__input" 
              ref={chatInput} 
              placeholder="ask me a question!"
              autoFocus
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMsg(e)
                }
              }}
            />
          {/* <div className="chat__input--wrap">
            <div className="chat__input--pull-tab"></div>
          </div> */}
          <button
            className="chat__btn"
            type="submit"
          >
            Send
          </button>
        </form>
    </>
  );
};
