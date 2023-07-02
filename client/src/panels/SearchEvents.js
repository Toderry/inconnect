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


const AlbumItems = ({posts, setActiveStory, setCurrentPost, previousPage, setPreviousPage}) => {

    const [Url, setUrl] = useState('https://cdn.culture.ru/images/cfe2929f-3608-5989-9954-39e28aa6fb48');


    useEffect(async () => {
        async function fetchData() {
            posts.map(async (post) => (
                post.url = (await getPictureByEventId(post.id)).picture_url

                //setUrl((await getPictureByEventId(post.id)).picture_url);
            ));

        }

        await fetchData();
    }, []);
    return posts.map((post) => (

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


const SearchEvents = (props) => {
    props.setPreviousPage("searchevents");
    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>События</PanelHeader>
                <Group header={<Header>Актуальные события</Header>}>
                    <FixedLayout vertical="top" filled>
                        <Search/>
                        <Separator wide/>
                    </FixedLayout>
                    <Header>Актуальные события</Header>
                    <div style={{display: 'block'}}>
                        <AlbumItems posts={props.posts} setActiveStory={props.setActiveStory}
                                    setCurrentPost={props.setCurrentPost}
                                    previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}/>
                    </div>
                </Group>
            </Panel>
        </View>
    );
};
SearchEvents.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default SearchEvents;