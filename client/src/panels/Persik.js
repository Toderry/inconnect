import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';
import {ROUTES} from "../routes";
import {getUsers, getIdUser} from "../http/userAPI";
import {getIdTag} from "../http/tagAPI";
import {getIdEventToTag} from "../http/eventToTagAPI";
import {getIdUserToEvent} from "../http/userToEventAPI";
import {getIdEvent} from "../http/eventAPI";

const Persik = ({setActiveStory, id}) => {
	const [users, setUsers] = useState();
	//const [iduser, setIdUser] = useState();
	const [idtag, setIdTag] = useState();
	const [idEvent, setIdEvent] = useState();

	const [idETT, setIdETT] = useState();
	const [idUserToEvent, setIdUserToEvent] = useState();
	useEffect(async () => {
		async function fetchData() {
			setUsers(await getUsers());
			/*setIdEvent(await getIdEvent(1))*/
			/*setIdUser(await getIdUser(1))*/
			setIdTag(await getIdTag(1))

			setIdETT(await getIdEventToTag(1))

			const eventTo = await getIdUserToEvent(1)
			setIdUserToEvent(eventTo)
			setIdEvent(await getIdEvent(eventTo[0].event_id))
		}

		await fetchData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				id="persik"
				before={<PanelHeaderBack onClick={() => setActiveStory(ROUTES.PROFILE)} data-to="profile"/>}
			>
				Абоба
				{/*users?.['1'].id*/}
				{/*(idtag?.[0].name)*/}
				{/*idETT?.[0].event_id*/}
				{/*idETT?.[0].tag_id*/}
				{idEvent?.name}
				{}
			</PanelHeader>
			<img className="Persik" src={persik} alt="Persik The Cat"/>
		</Panel>
	);
};

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
