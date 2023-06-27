import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import {ROUTES} from "../routes";

const Profile = ({ id, setActiveStory, fetchedUser, }) => (
	<Panel id={id}>
		<PanelHeader>Дом дракона</PanelHeader>
		{fetchedUser &&
			<Group>
				<Cell
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}

					subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`Привет, ${fetchedUser.first_name} ${fetchedUser.id}!`}
				</Cell>
			</Group>}

		<Group>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.PERSIK)} data-to="persik">
					Show me the Персика, please
				</Button>
			</Div>
		</Group>
		<Group>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.PERSIK)} data-to="persik">
					Теги
				</Button>
			</Div>
		</Group>

		{/*<Group>*/}
		{/*	<Div>*/}
		{/*		<Button stretched size="l" mode="secondary" onClick={go} data-to="events">*/}
		{/*			Show me the События, please*/}
		{/*		</Button>*/}
		{/*	</Div>*/}
		{/*</Group>*/}
		{/*<Group>*/}
		{/*	<Div>*/}
		{/*		<Button stretched size="l" mode="secondary" onClick={go} data-to="registration">*/}
		{/*			Show me the Registration, please*/}
		{/*		</Button>*/}
		{/*	</Div>*/}
		{/*</Group>*/}
	</Panel>
);

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Profile;