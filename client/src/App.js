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

    const [currentPost, setCurrentPost] = useState({id: -1, title: '-', body: '-',description: '-', thumb_src:"../img/img_not_found.jpg"});

    const platform = usePlatform();
    const {viewWidth} = useAdaptivityConditionalRender();

    const isVKCOM = platform !== Platform.VKCOM;

    const [posts, setPosts] = useState([
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
            body: 'Что-то на татарском'
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
    ])

    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
            //Запрашивает данные пользователя по id = 1 // 24.06.2023
            try {
                const response = await fetch("http://localhost:8080/api/user/1", {method: "GET"});
                const jsonData = await response.json();
                /*console.log("Got response:");
                console.log(jsonData);*/
            } catch(e) {console.log(e);}
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
                        />
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>

    );
}
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
