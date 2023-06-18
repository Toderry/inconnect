import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack,IconButton } from '@vkontakte/vkui';
import './SearchEvents.css'
import EventsList from '../components/EventsList';

import Icon20Sliders_outline from '@vkontakte/icons/dist/20/sliders_outline';
const SearchEvents = ({id, go, posts}) => (
	<Panel id={id}>
		<PanelHeader
			before = {<IconButton>
				<Icon20Sliders_outline />
			  </IconButton>}
			//before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
            Поиск
		</PanelHeader>
		<div className="Events">
			<EventsList posts = {posts} title={'Рекомендации'}/>




        </div>

	</Panel>
);

SearchEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default SearchEvents;