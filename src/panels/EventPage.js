import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack, Headline, Title, Text} from '@vkontakte/vkui';
import {ROUTES} from "../routes";

import './Events.css';
import img from "../img/img_not_found.jpg"

const EventPage = (props) => {
	return (
		<Panel>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => props.setActiveStory(ROUTES.EVENTS)} data-to="events"/>}
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
				<div style={{ padding: 20 }}>
					<Text>Полное описание события.</Text>
				</div>

				<div className="event_img">
				<img src={img}/>
				</div>
			</div>
			
	
		</Panel>
	);
}


export default EventPage;
//marginBottom: 16