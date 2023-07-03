import React, {useEffect, useState} from 'react';
import {Button, Headline, Panel, PanelHeader, PanelHeaderBack, Text, Title} from '@vkontakte/vkui';

import './Events.css';
import {addUserToEvent, deleteIdUserToEvent, getIdUserToIdEvent} from "../http/userToEventAPI";
import {getPictureByEventId} from "../http/eventToTagAPI";


const EventPage = (props) => {
    const [addText, setAddText] = useState(false);
    const buttonText = addText ? 'Отписаться' : 'Подписаться';
    const text = addText ? 'Вы подписанны' : '';
    const [Url, setUrl] = useState('');
    const [chatLink, setChatLink] = useState('Нет ссылки на чат.');



    useEffect(async () => {
        async function fetchData() {
            setUrl((await getPictureByEventId(props.currentPost.id)).picture_url)
            const idUserEvent = await getIdUserToIdEvent(props.fetchedUser.id, props.currentPost.id)//получаем связи
            console.log(idUserEvent?.id)
            if (idUserEvent?.id) {
                setAddText(true)//проверка на пустату
            }
        }
        if (props.currentPost.chat_link){
            setChatLink(`Ссылка на чат: ${props.currentPost.chat_link}`);
        }
        await fetchData();
        console.log(`props.currentPost.chat_link = ${props.currentPost.chat_link}`)
    }, []);

    //console.log(`prev. page: ${props.previousPage}`)
    //ROUTES.SEARCHEVENTS
    return (
        <Panel>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => props.setActiveStory(props.previousPage)}
                                         data-to={props.previousPage}/>}
            >
                {props.currentPost.name}
            </PanelHeader>

            <div>
                <Title level="1" style={{padding: 20}}>
                    {props.currentPost.name}
                </Title>

                <Headline level="1" style={{padding: 20}}>
                    {props.currentPost.text}
                </Headline>
                <Headline level="1" style={{padding: 20}}>
                    {props.currentPost.place}
                </Headline>
                <Headline level="1" style={{padding: 20}}>
                    {chatLink}
                </Headline>

                <div className="event_img">
                    <img src={Url}/>
                </div>
                <div style={{padding: 20}}>

                    <Text>
                        {text}
                    </Text>
                </div>
            </div>
            <div className="post__btns">
                <Button stretched size="m" mode="secondary"
                        onClick={async () => {
                            //console.log(`${addUserToEvent(1,1)}`)
                            if (addText === true) {
                                setAddText(false);
                                const idUserEvent = await getIdUserToIdEvent(props.fetchedUser.id, props.currentPost.id)
                                deleteIdUserToEvent(idUserEvent.id)
                            } else {
                                setAddText(true)
                                await addUserToEvent(props.fetchedUser.id, props.currentPost.id)//добавляем связь
                            }
                        }}
                >
                    {buttonText}
                </Button>
            </div>
        </Panel>
    );
}


export default EventPage;
//marginBottom: 16