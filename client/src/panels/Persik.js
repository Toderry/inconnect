import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';
import {ROUTES} from "../routes";
import {getUsers, getIdUser} from "../http/userAPI";

const Persik = ({setActiveStory, id}) => {
	const [users, setUsers] = useState();
	const [iduser, setIdUser] = useState();
	useEffect(async () => {
		async function fetchData() {
			setUsers(await getUsers());
			setIdUser(await getIdUser(1))
			console.log(iduser)
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
				{users?.['0'].id}
				{(iduser?.id)}
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
