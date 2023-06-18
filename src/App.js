import React, {useEffect, useState} from 'react';
//import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    AppRoot,
    Cell,
    ConfigProvider,
    Group,
    Panel,
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


const App = () => {
    const [activeStory, setActiveStory] = useState(ROUTES.EVENTS);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    const platform = usePlatform();
    const {viewWidth} = useAdaptivityConditionalRender();

    const isVKCOM = platform !== Platform.VKCOM;

    const [posts, setPosts] = useState([
        {id: 1, title: 'Прогулка на самокатах', body: '18+'},
        {id: 2, title: 'Резня', body: '🔪'},
        {id: 3, title: 'Аватар: сюжет вода', body: 'Но мне понравилось'},
    ])

    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
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
                        />
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>

    );
}
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
