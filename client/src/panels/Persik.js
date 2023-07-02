import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';
import {ROUTES} from "../routes";
import {getUsers} from "../http/userAPI";
import {getIdTag} from "../http/tagAPI";
import {getIdEventToTag} from "../http/eventToTagAPI";
import {getIdUserToEvent, getIdUserToIdEvent} from "../http/userToEventAPI";
import {getIdEvent} from "../http/eventAPI";


const Persik = ({setActiveStory, id}) => {
    const [idUidE, setIdUidE] = useState();
    useEffect(async () => {
        async function fetchData() {
            setIdUidE(await getIdUserToIdEvent(140129939, 5))
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
                {idUidE?.id}
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
