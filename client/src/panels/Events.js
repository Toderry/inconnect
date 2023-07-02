import React, { useState,useEffect } from 'react';
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
import {getEvents} from "../http/eventAPI";
import {getIdTag} from "../http/tagAPI";
import {getPictureByEventId} from "../http/eventToTagAPI";


  const largeImageStyles = {
	width: 220,
	height: 124,
	borderRadius: 4,
	boxSizing: 'border-box',
	border: 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)',
	objectFit: 'cover',
  };

  const AlbumItems = ({posts,setActiveStory,setCurrentPost,previousPage,setPreviousPage}) => {
	  const [Url, setUrl] = useState('');


	  useEffect(async () => {
		  async function fetchData() {
			  posts.map( async (post) => (
				  post.url=(await getPictureByEventId(post.id)).picture_url

				  //setUrl((await getPictureByEventId(post.id)).picture_url);
			  ));

		  }
		  await fetchData();
	  }, []);
	return posts.map( (post)  => (
		<HorizontalCell key={post.id} size="l" header={post.name} subtitle={post.text}
		onClick={() => {setActiveStory(ROUTES.EVENTPAGE);
						setCurrentPost(post);
		}}
		data-to="eventpage">
		  <img style={largeImageStyles} src={post.url} />
	  </HorizontalCell>
	));
  };

  const Events = (props) => {

	props.setPreviousPage("events")
	return (
	<View activePanel="horizontalCell">
	<Panel id="horizontalCell">
	  <PanelHeader>События</PanelHeader>
	  <Group header={<Header aside={
		  <Button stretched size="l" mode="secondary" onClick={() => props.setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents">
			  Показать все
		  </Button>
	  }>Рекомендации</Header>}>
		<HorizontalScroll>
		  <div style={{ display: 'flex' }}>
			<AlbumItems posts={props.posts} setActiveStory = {props.setActiveStory}
						setCurrentPost = {props.setCurrentPost}
						previousPage = {props.previousPage} setPreviousPage = {props.setPreviousPage}/>
		  </div>
		</HorizontalScroll>
	  </Group>
	  <Group header={<Header aside={
		  <Button stretched size="l" mode="secondary" onClick={() => props.setActiveStory(ROUTES.SEARCHEVENTS)} data-to="searchevents">
			  Показать все
		  </Button>
	  }>Лучшее</Header>}>
		<HorizontalScroll>
		  <div style={{ display: 'flex' }}>
			<AlbumItems posts={props.posts} setActiveStory = {props.setActiveStory}
						setCurrentPost = {props.setCurrentPost}
						previousPage = {props.previousPage} setPreviousPage = {props.setPreviousPage}/>
		  </div>
		</HorizontalScroll>
	  </Group>

		  </Panel>
	  </View>
  );
}
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
