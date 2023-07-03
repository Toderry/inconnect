import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    AppRoot,
    Cell,
    ConfigProvider,
    Group,
    PanelHeader,
    Platform,
    ScreenSpinner,
    SplitCol,
    SplitLayout,
    useAdaptivityConditionalRender,
    usePlatform
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';

import {NavigationBar} from "./components/NavBar";
import {ROUTES} from "./routes";
import {addUser} from "./http/userAPI";
import {getEvents} from "./http/eventAPI";
import {getPictureByEventId, getTagIdByEventId, getEventByTagId} from "./http/eventToTagAPI";

const App = () => {
    const [activeStory, setActiveStory] = useState(ROUTES.EVENTS);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    const [currentPost, setCurrentPost] = useState({
        id: -1,
        name: '-',
        text: '-',
        place: '-',
        date: '-',
        time: '-',
        thumb_src: "../img/img_not_found.jpg"
    });
    const [previousPage, setPreviousPage] = useState(ROUTES.EVENTS);

    const platform = usePlatform();
    const {viewWidth} = useAdaptivityConditionalRender();

    const isVKCOM = platform !== Platform.VKCOM;

    const [posts, setPosts] = useState([]);
    const [tagId, setTagId] = useState(null);
    const [picture, setPicture] = useState(null);
    // Для примера получения списка событий по id тега:
    const [events, setEvents] = useState([]);


    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
            //Запрашивает данные пользователя по id = 1 // 24.06.2023

            /*try {
                const response = await fetch("http://localhost:8080/api/user/1", {method: "GET"});
                const jsonData = await response.json();
                console.log("Got response:");
                console.log(jsonData);
            } catch(e) {console.log(e);}*/
            addUser(user.id);

            setPosts(await getEvents());
            setTagId(await getTagIdByEventId(1));
            setPicture(await getPictureByEventId(1));

            // Пример получения списка событий по id тега:
            setEvents(await getEventByTagId(1));
            console.log(`events = ${events}`);
            console.log(`events[0] = ${events[0]}`);
            console.log(`events[0].name = ${events[0].name}`);

        }

        fetchData();
    }, []);

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout
                        popout={popout}
                        header={isVKCOM && <PanelHeader separator={false}/>}
                        style={{justifyContent: 'center'}}>
                        {viewWidth.tabletPlus && (
                            <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
                                {isVKCOM && <PanelHeader/>}
                                <Group>
                                    <Cell
                                        disabled={activeStory === 'feed'}
                                        style={
                                            activeStory === 'feed'
                                                ? {
                                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                                    borderRadius: 8,
                                                }
                                                : {}
                                        }
                                        data-story="feed"
                                        onClick={onStoryChange}
                                        before={<Icon28Newsfeed/>}
                                    >
                                        feed
                                    </Cell>
                                    <Cell
                                        disabled={activeStory === 'profile'}
                                        style={
                                            activeStory === 'profile'
                                                ? {
                                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                                    borderRadius: 8,
                                                }
                                                : {}
                                        }
                                        data-story="profile"
                                        onClick={onStoryChange}
                                        before={<Icon28Newsfeed/>}
                                    >
                                        profile
                                    </Cell>
                                    <Cell
                                        disabled={activeStory === 'services'}
                                        style={
                                            activeStory === 'services'
                                                ? {
                                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                                    borderRadius: 8,
                                                }
                                                : {}
                                        }
                                        data-story="services"
                                        onClick={onStoryChange}
                                        before={<Icon28Newsfeed/>}
                                    >
                                        services
                                    </Cell>
                                    <Cell
                                        disabled={activeStory === 'messages'}
                                        style={
                                            activeStory === 'messages'
                                                ? {
                                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                                    borderRadius: 8,
                                                }
                                                : {}
                                        }
                                        data-story="messages"
                                        onClick={onStoryChange}
                                        before={<Icon28Newsfeed/>}
                                    >
                                        messages
                                    </Cell>
                                </Group>
                            </SplitCol>
                        )}
                        <NavigationBar setActiveStory={setActiveStory} activeStory={activeStory}
                                       posts={posts} fetchedUser={fetchedUser}
                                       currentPost={currentPost} setCurrentPost={setCurrentPost}
                                       previousPage={previousPage} setPreviousPage={setPreviousPage}
                        />
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>

    );
}
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
