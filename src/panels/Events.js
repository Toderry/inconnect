import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Panel,
	PanelHeader,
	Header,
	HorizontalScroll,
	PanelHeaderBack,
	Group,
	CardScroll,
	Card,
	View,
	HorizontalCell,
	Link,
	Button
} from '@vkontakte/vkui';

import './Events.css';
import PostItem from '../components/Postitem';
import EventsList from '../components/EventsList';
import {ROUTES} from "../routes";


const albumItems = [
	{
		id: 1,
		title: 'Прогуляка на самокатах',
		description: '15 июня',
		thumb_src: 'https://menstechnic.ru/wp-content/uploads/2021/01/es2-gallery1.jpg',
		body: '18+'
	},
	{
		id: 2,
		title: 'Концерт KAslda',
		description: '18 июля 18:00',
		thumb_src: 'https://cdn.culture.ru/images/cfe2929f-3608-5989-9954-39e28aa6fb48',
		body: '18+'
	},
	{
		id: 3,
		title: 'Вечеринка 🕺',
		description: '24 мая 20:00',
		thumb_src: 'https://aerodynamika.ru/wp-content/uploads/2021/12/1625195829_5-kartinkin-com-p-vecherinka-fon-krasivie-foni-5-e1639566218169.jpg',
		body: '🔪'
	},
	{
		id: 4,
		title: 'Аватар: сюжет вода',
		description: '29 мая 20:00',
		thumb_src: 'https://kartinki.cc/files/img/post/2306/stiven-leng-57.webp',
		body: 'Но мне понравилось'
	},
  ];
  const largeImageStyles = {
	width: 220,
	height: 124,
	borderRadius: 4,
	boxSizing: 'border-box',
	border: 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)',
	objectFit: 'cover',
  };

  const AlbumItems = () => {
	return albumItems.map(({ id, title, description, thumb_src }) => (
		<HorizontalCell key={id} size="l" header={title} subtitle={description}>
		  <img style={largeImageStyles} src={thumb_src} />
	  </HorizontalCell>
	));
  };

  const Events = ({id, go, posts,setActiveStory}) => (
	<View activePanel="horizontalCell">
	<Panel id="horizontalCell">
	  <PanelHeader>События</PanelHeader>
	  <Group header={<Header aside={
		  <Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents">
			  Показать все
		  </Button>
	  }>Рекомендации</Header>}>
		<HorizontalScroll>
		  <div style={{ display: 'flex' }}>
			<AlbumItems />
		  </div>
		</HorizontalScroll>
	  </Group>
	  <Group header={<Header aside={
		  <Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents">
			  Показать все
		  </Button>
	  }>Лучшее</Header>}>
		<HorizontalScroll>
		  <div style={{ display: 'flex' }}>
			<AlbumItems />
		  </div>
		</HorizontalScroll>
	  </Group>

	</Panel>
  </View>
  )

/* 	<Panel id={id}>
		<PanelHeader
			//before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
			События
		</PanelHeader>
		<div className="Events">
			<EventsList posts = {posts} title={'Рекомендации'}/>
        </div>

	</Panel> */

Events.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Events;
