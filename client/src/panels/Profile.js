import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Avatar,
    Button,
    Cell,
    Div,
    Group,
    Panel,
    PanelHeaderBack,
    View,
    Tabs,
    TabsItem,
    PanelHeader} from '@vkontakte/vkui';
import {ROUTES} from "../routes";
import {addUser} from "../http/userAPI";
import {getEvents, getIdEvent} from "../http/eventAPI";
import {getIdUserToIdTag, getTagToIdUser} from "../http/userToTagAPI";
import {getEventByTagId, getPictureByEventId, getTagIdByEventId} from "../http/eventToTagAPI";
import {getTags} from "../http/tagAPI";
import {addUserToEvent, deleteIdUserToEvent, getIdUserToIdEvent} from "../http/userToEventAPI";

const Profile = ({id, setActiveStory, fetchedUser,}) => {
    const [mode, setMode] = React.useState('all');
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [selected, setSelected] = React.useState('my_tag');
    let [nameTags, setNameTags] = React.useState([]);
    let [nameUsTags, setUsNameTags] = React.useState([]);



    useEffect(() => {
        async function fetchData() {
            const tags = await getTags();
            let idUserTag = []//получаем связи


            for (const i in tags) {//перебор по тегам
                idUserTag = await getIdUserToIdTag(fetchedUser.id, tags[i].id)//получаем связи
                if (idUserTag?.id) {
                    nameUsTags.push(tags[i].name);//если есть, в теги пользователя
                }else {
                    nameTags.push(tags[i].name);//иначе в остальные
                }
            }
            console.log(nameTags);

        }

        fetchData();
    }, []);

    return(
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
                <DefaultInPanel
                selected={selected}
                setSelected={setSelected}
                menuOpened={menuOpened}
                onMenuClick={(opened) => {
                setMenuOpened((prevState) => (opened ? !prevState : false));
                }}
            />
            {selected === 'my_tag' && (

            <Group id="tab-content-my_tag" aria-labelledby="tab-my_tag" role="tabpanel">
               {nameUsTags.map((buttonText) => (
              <Div key={buttonText}>
                <Button
                  align="center"
                  appearance="accent"
                  mode="secondary"
                  size="s"
                  onClick={async () => {
                      console.log(buttonText)

                  }}
                >
                  {buttonText}
                </Button>
                </Div>
                ))}
            </Group>
          )}
          {selected === 'add_teg' && (
            <Group
              id="tab-content-add_teg"
              aria-labelledby="tab-add_teg"
              role="tabpanel"
            >
              {nameTags.map((buttonText) => (
              <Div key={buttonText}>
                <Button
                  align="center"
                  appearance="accent"
                  mode="secondary"
                  size="s"
                >
                  {buttonText}
                </Button>
                </Div>
                ))}
            </Group>
          )}
        <Group>
            <Div>
                <Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.PERSIK)}
                        data-to="persik">
                    Show me the Персика, please
                </Button>
            </Div>
        </Group>
        <Group>
            <Div>
                <Button stretched size="l" mode="secondary" onClick={() => setActiveStory(ROUTES.PERSIK)}
                        data-to="persik">
                    Теги
                </Button>
            </Div>
        </Group>
    </Panel>)
};
const DefaultInPanel = ({ menuOpened, onMenuClick, selected, setSelected }) => {
    return (
      <Tabs>
        <TabsItem
          selected={selected === 'my_tag'}
          onClick={() => {
            if (selected === 'my_tag') {
              onMenuClick(true);
            }
            setSelected('my_tag');
          }}
          id="tab-my_tag"
          aria-controls="tab-content-my_tag"
        >
          Мои интересы
        </TabsItem>
        <TabsItem
          selected={selected === 'add_teg'}
          onClick={() => {
            onMenuClick(false);
            setSelected('add_teg');
          }}
          id="tab-add_teg"
          aria-controls="tab-content-add_teg"
        >
          Добавить интересы
        </TabsItem>
      </Tabs>
    );
  };
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