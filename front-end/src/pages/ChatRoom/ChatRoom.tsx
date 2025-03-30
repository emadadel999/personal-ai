import React, {
	FormEvent,
	KeyboardEvent,
	useRef,
	useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { Message } from '../../types/message';
import Msg from '../../components/msg';
import TextareaAutosize from 'react-textarea-autosize';
import { getAnswer } from '../../shared/api-calls/aiApi';

interface ChatRoomProps {
	close: (model: string) => void;
	model: string;
}

export default function ChatRoom({ close, model }: ChatRoomProps) {
	const chatInput = useRef<HTMLTextAreaElement>(null);
	const chatRoomContainer = useRef<HTMLDivElement>(null);
	const formElement = useRef<HTMLFormElement>(null);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			type: 'a',
			content: 'Hello! How can I assist you today?',
			thinkContent: '',
		},
	]);

	function sendMsg(
		e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
	) {
		e.preventDefault();
		let textMsg = '';
		if (chatInput.current) {
			textMsg = chatInput?.current?.value;
			if (textMsg.trim()) {
				chatInput.current.value = '';
				send(textMsg);
			} else {
			}
		}
	}

	async function send(msgText: string) {
		setMessages((prevMsgs) => [
			...prevMsgs,
			{ id: uuid(), content: msgText, type: 'q' },
		]);

		const answerId = uuid();

		let thinking = false;
		for await (const msgChunk of getAnswer(msgText, model)) {
			setMessages((prevMsgs) => {
				if (thinking || msgChunk.includes('<think>')) {
					if (msgChunk.includes('<think>')) {
						thinking = true;
						return [...prevMsgs];
					}
					if (msgChunk.includes('</think>')) {
						thinking = false;
						return [...prevMsgs];
					}

					const lastMsg = prevMsgs.findLast((m) => m.id === answerId);

					if (lastMsg?.thinkContent) {
						lastMsg.thinkContent = lastMsg.thinkContent.concat(msgChunk);
						return [...prevMsgs];
					} else if (msgChunk) {
						return [
							...prevMsgs,
							{ id: answerId, type: 'a', thinkContent: msgChunk },
						];
					} else return [...prevMsgs];
				} else {
					const lastMsg = prevMsgs.findLast((m) => m.id === answerId);
					if (lastMsg) {
						lastMsg.content = lastMsg.content
							? lastMsg.content.concat(msgChunk)
							: msgChunk;
						return [...prevMsgs];
					} else {
						return [
							...prevMsgs,
							{ id: answerId, type: 'a', content: msgChunk },
						];
					}
				}
			});
		}
	}

	return (
		<>
			<section
				id='messages'
				className='chat__msgs'
				ref={chatRoomContainer}
			>
				{messages.map((msg, i) => (
					<Msg msg={msg} isQuestion={msg.type === 'q'} key={i} />
				))}
			</section>
			<section id='text'>
				<form id="text-sender" ref={formElement} onSubmit={sendMsg} className='chat__texter'>
					<TextareaAutosize
						className='texter__input'
						ref={chatInput}
						placeholder='ask me a question!'
						autoFocus
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								sendMsg(e);
							}
						}}
					/>
					<button className='texter__send' type='submit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 48 48'
						>
							<g fill='none'>
								<path
									fill='url(#fluentColorSend482)'
									d='M9.685 24.003L7.727 18l24.496 5.023c1.065.218 1.065 1.74 0 1.96L7.726 30.004z'
								/>
								<path
									fill='url(#fluentColorSend480)'
									d='M7.262 4.244c-1.787-.893-3.765.812-3.146 2.711L8.13 19.26a2 2 0 0 0 1.573 1.352l15.86 2.643c.835.14.835 1.34 0 1.48L9.704 27.378a2 2 0 0 0-1.573 1.352L4.116 41.042c-.62 1.9 1.359 3.605 3.146 2.712l35.494-17.742c1.659-.83 1.659-3.197 0-4.026z'
								/>
								<path
									fill='url(#fluentColorSend481)'
									d='M7.262 4.244c-1.787-.893-3.765.812-3.146 2.711L8.13 19.26a2 2 0 0 0 1.573 1.352l15.86 2.643c.835.14.835 1.34 0 1.48L9.704 27.378a2 2 0 0 0-1.573 1.352L4.116 41.042c-.62 1.9 1.359 3.605 3.146 2.712l35.494-17.742c1.659-.83 1.659-3.197 0-4.026z'
								/>
								<defs>
									<linearGradient
										id='fluentColorSend480'
										x1='4'
										x2='38.255'
										y1='-12.249'
										y2='33.27'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#3bd5ff' />
										<stop offset='1' stopColor='#0094f0' />
									</linearGradient>
									<linearGradient
										id='fluentColorSend481'
										x1='24'
										x2='34.402'
										y1='14.781'
										y2='42.925'
										gradientUnits='userSpaceOnUse'
									>
										<stop offset='.125' stopColor='#dcf8ff' stopOpacity='0' />
										<stop offset='.769' stopColor='#ff6ce8' stopOpacity='0.7' />
									</linearGradient>
									<radialGradient
										id='fluentColorSend482'
										cx='0'
										cy='0'
										r='1'
										gradientTransform='matrix(14.5 0 0 1.9375 6 24)'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#0094f0' />
										<stop offset='1' stopColor='#2052cb' />
									</radialGradient>
								</defs>
							</g>
						</svg>
					</button>
				</form>
				<button className='chat__exit' onClick={() => close(model)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 16 16'
					>
						<g fill='none'>
							<path
								fill='url(#fluentColorSettings160)'
								d='M2.267 6.153A6 6 0 0 1 3.53 3.98a.36.36 0 0 1 .382-.095l1.36.484a.71.71 0 0 0 .935-.538l.26-1.416a.35.35 0 0 1 .274-.282a6.1 6.1 0 0 1 2.52 0c.14.03.248.141.274.282l.26 1.416a.708.708 0 0 0 .935.538l1.36-.484a.36.36 0 0 1 .382.095a6 6 0 0 1 1.262 2.173a.35.35 0 0 1-.108.378l-1.102.931a.703.703 0 0 0 0 1.076l1.102.931c.11.093.152.242.108.378a6 6 0 0 1-1.262 2.173a.36.36 0 0 1-.382.095l-1.36-.484a.71.71 0 0 0-.935.538l-.26 1.416a.35.35 0 0 1-.275.282a6.1 6.1 0 0 1-2.519 0a.35.35 0 0 1-.275-.282l-.259-1.416a.708.708 0 0 0-.935-.538l-1.36.484a.36.36 0 0 1-.382-.095a6 6 0 0 1-1.262-2.173a.35.35 0 0 1 .108-.378l1.102-.931a.704.704 0 0 0 0-1.076l-1.102-.931a.35.35 0 0 1-.108-.378M6.25 8a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 0 0-3.5 0'
							/>
							<defs>
								<linearGradient
									id='fluentColorSettings160'
									x1='10.874'
									x2='4.166'
									y1='13.534'
									y2='3.086'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#0094f0' />
									<stop offset='1' stopColor='#3bd5ff' />
								</linearGradient>
							</defs>
						</g>
					</svg>
				</button>
			</section>
		</>
	);
}
