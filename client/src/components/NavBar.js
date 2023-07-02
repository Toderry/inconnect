import {Badge, Counter, Epic, SplitCol, Tabbar, TabbarItem, useAdaptivityConditionalRender} from "@vkontakte/vkui";
import Events from "../panels/Events";
import SearchEvents from "../panels/SearchEvents";
import Profile from "../panels/Profile";
import Persik from "../panels/Persik";
import React from "react";
import EventPage from "../panels/EventPage";

import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Message_outline from '@vkontakte/icons/dist/28/message_outline';
import Icon28User_circle_outline from '@vkontakte/icons/dist/28/user_circle_outline';
import {ROUTES} from "../routes";
import {Icon28Newsfeed} from "@vkontakte/icons";

export const NavigationBar = ({
                                  setActiveStory, activeStory, fetchedUser, posts, currentPost, setCurrentPost,
                                  previousPage, setPreviousPage
                              }) => {
    const {viewWidth} = useAdaptivityConditionalRender();
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    return <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
            activeStory={activeStory}
            tabbar={
                viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                        <TabbarItem
                            onClick={() => setActiveStory('events')}
                            selected={activeStory === 'events'}
                            data-story="events"
                            text="Главная"
                        >
                            <Icon28Newsfeed/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => setActiveStory('searchevents')}
                            selected={activeStory === 'searchevents'}
                            data-story="searchevents"
                            text="Поиск"
                        >
                            <Icon28Search/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'messages'}
                            data-story="messages"
                            indicator={
                                <Counter size="s" mode="prominent">
                                    12
                                </Counter>
                            }
                            text="Сообщения"
                        >
                            <Icon28Message_outline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => setActiveStory('profile')}
                            selected={activeStory === 'profile'}
                            data-story="profile"
                            indicator={<Badge mode="prominent"/>}
                            text="Профиль"
                        >
                            <Icon28User_circle_outline/>
                        </TabbarItem>
                    </Tabbar>
                )
            }
        >
            <Events id={ROUTES.EVENTS} posts={posts} go={onStoryChange} setActiveStory={setActiveStory}
                    currentPost={currentPost} setCurrentPost={setCurrentPost}
                    previousPage={previousPage} setPreviousPage={setPreviousPage}/>
            <SearchEvents id={ROUTES.SEARCHEVENTS} posts={posts} go={onStoryChange}
                          activeStory={activeStory} setActiveStory={setActiveStory}
                          currentPost={currentPost} setCurrentPost={setCurrentPost}
                          previousPage={previousPage} setPreviousPage={setPreviousPage}/>
            <Profile id={ROUTES.PROFILE} fetchedUser={fetchedUser} setActiveStory={setActiveStory}/>
            <Persik id={ROUTES.PERSIK} setActiveStory={setActiveStory}/>
            <EventPage id={ROUTES.EVENTPAGE} go={onStoryChange} activeStory={activeStory}
                       setActiveStory={setActiveStory}
                       currentPost={currentPost} setCurrentPost={setCurrentPost} fetchedUser={fetchedUser}
                       previousPage={previousPage} setPreviousPage={setPreviousPage}/>
        </Epic>
    </SplitCol>
}