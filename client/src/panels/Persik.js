import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';
import {ROUTES} from "../routes";

const Persik = ({setActiveStory, id}) => (
	<Panel id={id}>
		<PanelHeader
			id="persik"
			before={<PanelHeaderBack onClick={() => setActiveStory(ROUTES.PROFILE)} data-to="profile"/>}
		>
			Абоба
		</PanelHeader>
		<img className="Persik" src={persik} alt="Persik The Cat"/>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
