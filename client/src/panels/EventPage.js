import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack, Headline, Title, Text, ButtonGroup, Button} from '@vkontakte/vkui';
import {ROUTES} from "../routes";

import './Events.css';
import img from "../img/img_not_found.jpg"
import {addUserToEvent, getIdUserToEvent, getUserToEvents} from "../http/userToEventAPI";

const EventPage = (props) => {
	const [addText, setAddText] = useState(true);
	const buttonText = addText ? 'Подписаться' : 'Отписаться';
	const text = addText ? '' : 'Вы подписанны';
	return (
		<Panel>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => props.setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents"/>}
			>
				{props.currentPost.name}
			</PanelHeader>

			<div>
				<Title level="1" style={{ padding: 20 }}>
					{props.currentPost.name}
				</Title>

				<Headline level="1" style={{ padding: 20 }}>
					{props.currentPost.text}
				</Headline>
				<Headline level="1" style={{ padding: 20 }}>
					{props.currentPost.place}
				</Headline>

				<div className="event_img">
				<img src={"https://menstechnic.ru/wp-content/uploads/2021/01/es2-gallery1.jpg"}/>
				</div>
				<div style={{ padding: 20 }}>

					<Text>
						{text}
					</Text>
				</div>
			</div>
			<div className="post__btns">
				<Button stretched size="m" mode="secondary"
					onClick={() => {

						if (addText === true) {
							setAddText(false)
						} else {

							setAddText(true)
						}


					}}

				>
					{buttonText}


				</Button>
			</div>


		</Panel>
	);
}


export default EventPage;
//marginBottom: 16