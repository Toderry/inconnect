import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './SearchEvents.css';

import {
	CardGrid,
	ContentCard,
	FixedLayout,
	Group,
	Header,
	Panel,
	PanelHeader,
	Search,
	Separator,
	View
} from '@vkontakte/vkui';

import './Events.css';
import {ROUTES} from "../routes";
import {getPictureByEventId} from "../http/eventToTagAPI";
import {getIdUserToIdEvent, getEventsByUserId} from "../http/userToEventAPI";


const AlbumItems = ({posts, setActiveStory, setCurrentPost, fetchedUser,previousPage, setPreviousPage}) => {

    const [MyPosts, setMyPosts] = useState([]);
    const [idUserEvent, setIdUserEvent] = useState([]);


    useEffect(async () => {
        async function fetchData() {

            /*posts.map(async (post) => (
                MyPosts.push(post)
            ));

            MyPosts.map(async (post) => (
                post.url = (await getPictureByEventId(post.id)).picture_url//
            ));*/

            setMyPosts(await getEventsByUserId(fetchedUser.id));
            MyPosts.map(async (post) => (
                post.url = (await getPictureByEventId(post.id)).picture_url//
            ));


        }

        await fetchData();
    }, []);
    return MyPosts.map((post) => (

        <CardGrid size="l">
            <ContentCard
                key={post.id}

                caption={post.text}
                header={post.name}

                src={post.url}
                maxHeight={250}
                onClick={() => {
                    setActiveStory(ROUTES.EVENTPAGE);
                    setCurrentPost(post);
                }}
                data-to="eventpage"
            />
        </CardGrid>
    ));
};


const Sobitia = (props) => {
    props.setPreviousPage("sobitia");
    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>События</PanelHeader>
                <Group header={<Header>Мои подписки</Header>}>
                    <div style={{display: 'block'}}>
                        <AlbumItems posts={props.posts} setActiveStory={props.setActiveStory}
                                    setCurrentPost={props.setCurrentPost}
                                    fetchedUser={props.fetchedUser}
                                    previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}/>
                    </div>
                </Group>
            </Panel>
        </View>
    );
};
Sobitia.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Sobitia;