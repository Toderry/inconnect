import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui';

import './Events.css';
import EventsList from '../components/EventsList';


const Events = ({id, go, posts, setActiveStory, currentPost, setCurrentPost}) => (
	<Panel id={id}>
		<PanelHeader
			//before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
			События
		</PanelHeader>
		<div className="Events">
			<EventsList posts = {posts} title={'Рекомендации'} setActiveStory={setActiveStory} currentPost={currentPost}
			setCurrentPost={setCurrentPost}/>
        </div>

	</Panel>
);

Events.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Events;
