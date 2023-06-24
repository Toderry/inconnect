import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui';

import './SearchEvents.css';
import EventsList from '../components/EventsList';


const SearchEvents = ({id, go, posts, setActiveStory, currentPost, setCurrentPost}) => (
	<Panel id={id}>
		<PanelHeader
			//before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
			События
		</PanelHeader>
		<div className="SearchEvents">
			<EventsList posts = {posts} title={'Актуальные события'} setActiveStory={setActiveStory} currentPost={currentPost}
			setCurrentPost={setCurrentPost}/>
        </div>

	</Panel>
);

SearchEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default SearchEvents;
