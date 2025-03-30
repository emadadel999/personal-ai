import React, { useState } from "react";
import { Message } from "../types/message";
import Markdown from "./markdown";
import MsgCtrls from "./msg-ctrls";

export default function Msg({msg, isQuestion} : { msg: Message; isQuestion: boolean }) {
  const [showThinking, setShowThinking] = useState<boolean>(false);
  return (
    <div className={isQuestion ? "message --question" : "message"} key={msg.id}>
      { msg.thinkContent && msg.thinkContent.trim() && (
        <div className="message__thinking" onClick={() => setShowThinking((t) => !t)}>
          <div className="thinking__status">
            { msg.content ? (
              <p className="thinking__title">Done</p>
            ) : (
              <>
                <p className="thinking__title">Thinking</p>
                <svg
                  className="thinking__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <circle cx="18" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin=".67"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                  <circle cx="12" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin=".33"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                  <circle cx="6" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin="0"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                </svg>
              </>
            )}

            <svg
              className={showThinking ? "thinking__toggler" : "thinking__toggler --expanded"}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 14.5a1 1 0 0 1-.71-.29L12 10.9l-3.3 3.18a1 1 0 0 1-1.41 0a1 1 0 0 1 0-1.42l4-3.86a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.42a1 1 0 0 1-.69.28"
              />
            </svg>
          </div>
          { showThinking && (
            <blockquote className="thinking__text">{msg.thinkContent}</blockquote>
          )}
        </div>
      )}
      { msg.content && (
        <>
          <Markdown className="message__text" markdown={msg.content}/>
          { !isQuestion && <MsgCtrls className="message__ctrls" msg={msg.content}/>}
        </>
      )}
    </div>
  );
}
