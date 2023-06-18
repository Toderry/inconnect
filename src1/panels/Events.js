import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {Header, Panel, PanelHeader, PanelHeaderBack, Group} from '@vkontakte/vkui';

import './Events.css';
import PostItem from '../components/Postitem';
import EventsList from '../components/EventsList';



const Events = ({id, go, posts}) => (
	<Panel id={id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
			Привет!
		</PanelHeader>
		<Group>
			<div className="Events">
				<EventsList posts = {posts} title={'Рекомендации'}/>
			</div>
		</Group>
	</Panel>
);

Events.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Events;
