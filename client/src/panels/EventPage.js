import React, {useEffect, useState} from 'react';
import {Button,
    Headline,
    Panel,
    PanelHeader,
    CardGrid,
    ContentCard,
    Snackbar,
    PanelHeaderBack,
    Text,
    Title,
    SimpleCell,
    Group,
    Separator,
    Avatar,
    Div,
    Spacing} from '@vkontakte/vkui';

import './Events.css';
import {addUserToEvent, deleteIdUserToEvent, getIdUserToIdEvent} from "../http/userToEventAPI";
import {getPictureByEventId} from "../http/eventToTagAPI";
import Icon28Place_outline from '@vkontakte/icons/dist/28/place_outline';
import Icon28Сalendar_outline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Recent_outline from '@vkontakte/icons/dist/28/recent_outline';
import {Icon28CheckCircleOutline} from "@vkontakte/icons";
const EventPage = (props) => {
    const [addText, setAddText] = useState(false);
    const buttonText = addText ? 'Отписаться' : 'Подписаться';
    // const text = addText ? 'Вы подписанны' : '';
    const [Url, setUrl] = useState('');

    const [text, setText] = React.useState('');
    const [snackbar, setSnackbar] = React.useState(null);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // getMonth returns a zero-based index of the month: 0-11
    const day = date.getDate(); // 0 - 31
    const hours = date.getHours(); // 0 - 23
    const minutes = date.getMinutes(); // 0 - 59



    useEffect(async () => {
        async function fetchData() {
            setUrl((await getPictureByEventId(props.currentPost.id)).picture_url)
            const idUserEvent = await getIdUserToIdEvent(props.fetchedUser.id, props.currentPost.id)//получаем связи
            console.log(idUserEvent?.id)
            if (idUserEvent?.id) {
                setAddText(true)//проверка на пустату
            }
        }
        await fetchData();
    }, []);
    //ROUTES.SEARCHEVENTS
    return (
        <Panel>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => props.setActiveStory(props.previousPage)}
                                         data-to={props.previousPage}/>}
            >
                {props.currentPost.name}
            </PanelHeader>
            <div className="event_img">
                    <img src={Url}/>
                </div>
            <ContentCard
                header={props.currentPost.name}
                caption={props.currentPost.text}
            />

            <div style={{display: 'block'}}>
                <Group>
                    <SimpleCell subtitle={props.currentPost.place} before={<Icon28Place_outline />}>
                        Место
                    </SimpleCell>
                    <SimpleCell subtitle={new Date(props.currentPost.date).toLocaleString('rus', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                                before={<Icon28Сalendar_outline />}>
                        Дата
                    </SimpleCell>
                    <SimpleCell subtitle={props.currentPost.time} before={<Icon28Recent_outline />}>
                        Время
                    </SimpleCell>
                </Group>
            </div>

            <div className="post__btns">
                <Button stretched size="m" mode="secondary"
                // onClick={openSuccess}
                        onClick={async () =>  {
                            //console.log(`${addUserToEvent(1,1)}`)
                            if (addText === true) {
                                setAddText(false);
                                const idUserEvent = await getIdUserToIdEvent(props.fetchedUser.id, props.currentPost.id)
                                deleteIdUserToEvent(idUserEvent.id)
                            } else {
                                setAddText(true);
                                await addUserToEvent(props.fetchedUser.id, props.currentPost.id);//добавляем связь

                                if (snackbar) return;
                                setSnackbar(
                                    <Snackbar
                                        onClose={() => setSnackbar(null)}
                                        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
                                    >
                                        Вы подписались на события
                                    </Snackbar>,
                                );

                            }
                        }
                    }
                >
                    {buttonText}
                </Button>
            </div>
            {text && (
                <Group>
                    <Div>{text}</Div>
                </Group>
            )}
            {snackbar}
        </Panel>
    );
    }

export default EventPage;