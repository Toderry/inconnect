import React, { useState, useEffect } from 'react';
//import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import ReactDOM from 'react-dom';
import { usePlatform, Platform, Search } from '@vkontakte/vkui';
import {goBack, closeModal, setStory} from "./store/router/actions";
import { View,
	 ScreenSpinner,
	 ConfigProvider,
	AdaptivityProvider,
	AppRoot,
	SplitLayout, SplitCol,
	Epic, Root,
	Tabbar, ModalRoot,
	TabbarItemPanel,TabbarItem,Placeholder,
	PanelHeader,Counter,
	ViewWidth,Panel,Group,Cell,Badge,PanelHeaderBack,
	Header,useAdaptivityConditionalRender } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Profile from './panels/Profile';
import Persik from './panels/Persik';
import Events from './panels/Events';
import HomeTwo from './panels/HomeTwo';
import SearchEvents from './panels/SearchEvents';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Message_outline from '@vkontakte/icons/dist/28/message_outline';
import Icon28User_circle_outline from '@vkontakte/icons/dist/28/user_circle_outline';
import Registration from '../src/panels/Registration';

const ROUTES = {
	EVENTS: 'events',
	PERSIK: 'persik',
	SEARCHEVENTS: 'searchevents',
	REGISTRATION: 'registration',
	PROFILE: 'profile',

};
const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.EVENTS);
	const [activeStory, setActiveStory] = React.useState(ROUTES.EVENTS);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const platform = usePlatform();
	const { viewWidth } = useAdaptivityConditionalRender();

	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
	const isVKCOM = platform !== Platform.VKCOM;

	const [posts, setPosts] = useState([
		{id:1, title: 'Прогулка на самокатах', body: '18+'},
		{id:2, title: 'Резня', body: '🔪'},
		{id:3, title: 'Аватар: сюжет вода', body: 'Но мне понравилось'},
	])


	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
					popout={popout}
					header={isVKCOM && <PanelHeader separator={false} />}
      				style={{ justifyContent: 'center' }}>
					{viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
          <Panel activePanel={activePanel}>
            {isVKCOM && <PanelHeader />}
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
                before={<Icon28Newsfeed />}
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
                before={<Icon28Newsfeed />}
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
                before={<Icon28Newsfeed />}
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
                before={<Icon28Newsfeed />}
              >
                messages
              </Cell>
            </Group>
          </Panel>
        </SplitCol>
      )}
	  <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
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
                  <Icon28Newsfeed />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setActiveStory('searchevents')}
                  selected={activeStory === 'searchevents'}
                  data-story="searchevents"
                  text="Поиск"
                >
                  <Icon28Search />
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
                  <Icon28Message_outline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setActiveStory('profile')}
                  selected={activeStory === 'profile'}
                  data-story="profile"
                  indicator={<Badge mode="prominent" />}
                  text="Профиль"
                >
                  <Icon28User_circle_outline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
		  	<Events id={ROUTES.EVENTS} posts={posts} go={go} />
		  	<SearchEvents id={ROUTES.SEARCHEVENTS} posts={posts} go={go} />
			<Profile id={ROUTES.PROFILE} fetchedUser={fetchedUser} go={go} />
			<Persik id={ROUTES.PERSIK} go={go} />

        </Epic>
      </SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>

	);
}
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
