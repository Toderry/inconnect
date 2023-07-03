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
import {addUserToTag, deleteIdUserToTag, getIdUserToIdTag, getTagToIdUser} from "../http/userToTagAPI";
import {getEventByTagId, getPictureByEventId, getTagIdByEventId} from "../http/eventToTagAPI";
import {getTags} from "../http/tagAPI";
import {addUserToEvent, deleteIdUserToEvent, getIdUserToIdEvent} from "../http/userToEventAPI";

const Profile = ({id, setActiveStory, fetchedUser,}) => {
    const [mode, setMode] = React.useState('all');
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [selected, setSelected] = React.useState('my_tag');
    const [nameTags, setNameTags] = React.useState([]);
    const [nameUsTags, setUsNameTags] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const tags = await getTags();
            let idUserTag;//получаем связи
            const localNameUsTags = nameUsTags;
            const localNameTags = nameTags;

            for (const i in tags) {//перебор по тегам
                idUserTag = await getIdUserToIdTag(fetchedUser.id, tags[i].id)//получаем связи
                if (idUserTag?.id) {
                    localNameUsTags.push(tags[i]);//если есть - в теги пользователя
                }else {
                    localNameTags.push(tags[i]);//иначе в остальные
                }
            }
            setUsNameTags(localNameUsTags)
            setNameTags(localNameTags);
            console.log(nameTags);
        }

        fetchData();
    }, []);

    return(
    <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        {fetchedUser &&
            <Group>
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}

                    subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`Привет, ${fetchedUser.first_name} ${fetchedUser.last_name}!`}
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
               {nameUsTags.map((userTag) => (
              <Div key={userTag.name}>
                <Button
                  align="center"
                  appearance="accent"
                  mode="secondary"
                  size="s"
                  onClick={async () => {
                      //console.log(userTag)
                      await deleteIdUserToTag((await getIdUserToIdTag(fetchedUser.id, userTag.id)).id)
                      setUsNameTags(nameUsTags.filter(s => s.id !== userTag.id));
                      setNameTags([userTag, ...nameTags]);

                      //console.log((await deleteIdUserToTag(fetchedUser.id, userTag.id)))
                      //console.log(fetchedUser.id, userTag.id)
                  }}
                >
                  {userTag.name}
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
              {nameTags.map((tag) => (
              <Div key={tag.name}>
                <Button
                  align="center"
                  appearance="accent"
                  mode="secondary"
                  size="s"
                  onClick={async () => {
                      await addUserToTag(fetchedUser.id, tag.id)
                      setNameTags(nameTags.filter(s => s.id !== tag.id));
                      setUsNameTags([tag, ...nameUsTags]);
                  }}
                >
                  {tag.name}
                </Button>
                </Div>
                ))}
            </Group>
          )}

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