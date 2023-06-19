import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack, Headline, Title, Text, ButtonGroup, Button} from '@vkontakte/vkui';
import {ROUTES} from "../routes";

import './Events.css';
import img from "../img/img_not_found.jpg"

const EventPage = (props) => {
	const [addText, setAddText] = useState(true);
	const buttonText = addText ? 'Подписаться' : 'Отписаться';
	return (
		<Panel>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => props.setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents"/>}
			>
				{props.currentPost.title}
			</PanelHeader>

			<div>
				<Title level="1" style={{ padding: 20 }}>
					{props.currentPost.title}
				</Title>

				<Headline level="1" style={{ padding: 20 }}>
					{props.currentPost.body}
				</Headline>
				<Headline level="1" style={{ padding: 20 }}>
					{props.currentPost.description}
				</Headline>

				<div className="event_img">
				<img src={props.currentPost.thumb_src}/>
				</div>
				<div style={{ padding: 20 }}>
					<Text></Text>
				</div>
			</div>
			<div className="post__btns">
				<Button stretched size="m" mode="secondary"
					onClick={() => {

						if (addText===true){
							setAddText(false)
						}else{
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