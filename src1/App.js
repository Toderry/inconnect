import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import Events from './panels/Events';
import Registration from '../src/panels/Registration';

const ROUTES = {
	HOME: 'home',
	EVENTS: 'events',
	PERSIK: 'persik',
	REGISTRATION: 'registration',

};
const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} />
								<Persik id={ROUTES.PERSIK} go={go} />
								<Events id={ROUTES.EVENTS} posts={posts} go={go} />
								<Registration id={ROUTES.REGISTRATION} go={go} />

							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
