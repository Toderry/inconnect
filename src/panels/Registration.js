import React, { useState, useEffect } from 'react';
import {View, Panel, Group, PanelHeader, FormItem, FormLayout, Input, PanelHeaderBack, CellButton, FormLayoutGroup, SegmentedControl, Select, Textarea, Checkbox} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {Link, Button} from '@vkontakte/vkui';

const addressItems = [
    { label: 'Почтовый индекс', name: 'zip' },
    { label: 'Страна', name: 'country' },
    { label: 'Город', name: 'city' },
];

const Registration = ({id, go}) => {
    const [email, setEmail] = React.useState('');
    const [purpose, setPurpose] = React.useState('');
    const [showPatronymic, setShowPatronymic] = React.useState(true);

    const onChange = (e) => {
        const { name, value } = e.currentTarget;

        const setStateAction = {
            email: setEmail,
            purpose: setPurpose,
        }[name];

        setStateAction && setStateAction(value);
    };

    const onShowPatronymic = () => setShowPatronymic(true);

    const onRemove = () => setShowPatronymic(false);

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={go} data-to="home"/>}
            >
                Регистрация
            </PanelHeader>
            <Group>
                <FormLayout>
                    <FormItem
                        htmlFor="email"
                        top="E-mail"
                        status={email ? 'valid' : 'error'}
                        bottom={
                            email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'
                        }
                    >
                        <Input id="email" type="email" name="email" value={email} onChange={onChange} />
                    </FormItem>

                    <FormItem top="Пароль" htmlFor="pass">
                        <Input id="pass" type="password" placeholder="Введите пароль" />
                    </FormItem>

                    <FormItem bottom="Пароль может содержать только латинские буквы и цифры.">
                        <Input type="password" placeholder="Повторите пароль" />
                    </FormItem>

                    <FormLayoutGroup mode="horizontal">
                        <FormItem htmlFor="name" top="Имя">
                            <Input id="name" />
                        </FormItem>
                        <FormItem htmlFor="lastname" top="Фамилия">
                            <Input id="lastname" />
                        </FormItem>
                    </FormLayoutGroup>

                    {!showPatronymic ? (
                        <CellButton onClick={onShowPatronymic}>Указать отчество</CellButton>
                    ) : (
                        <FormItem
                            htmlFor="patronymic"
                            removable
                            onRemove={onRemove}
                            top="Отчество"
                            bottom="Если у вас нет отчества — удалите этот пункт."
                        >
                            <Input id="patronymic" />
                        </FormItem>
                    )}

                    <FormItem top="Пол">
                        <Select
                            placeholder="Выберите пол"
                            options={[
                                {
                                    value: '0',
                                    label: 'Мужской',
                                },
                                {
                                    value: '1',
                                    label: 'Женский',
                                },
                            ]}
                        />
                    </FormItem>

                    <FormItem top="Тип документа">
                        <SegmentedControl
                            size="m"
                            name="type"
                            options={[
                                {
                                    label: 'Паспорт РФ',
                                    value: 'russian',
                                },
                                {
                                    label: 'Заграничный',
                                    value: 'international',
                                },
                            ]}
                        />
                    </FormItem>

                    {addressItems.map(({ label, name }) => (
                        <FormItem htmlFor={label} top={label} key={name}>
                            <Input id={label} name={name} />
                        </FormItem>
                    ))}
                    <FormItem
                        top="Цель поездки"
                        bottom={purpose ? '' : 'Пожалуйста, укажите цель поездки'}
                        status={purpose ? 'valid' : 'error'}
                    >
                        <Select
                            placeholder="Выберите цель поездки"
                            onChange={onChange}
                            value={purpose}
                            name="purpose"
                            options={[
                                {
                                    value: '0',
                                    label: 'Бизнес или работа',
                                },
                                {
                                    value: '1',
                                    label: 'Индивидуальный туризм',
                                },
                                {
                                    value: '2',
                                    label: 'Посещение близких родственников',
                                },
                            ]}
                        />
                    </FormItem>
                    <FormItem htmlFor="about" top="О себе">
                        <Textarea id="about" />
                    </FormItem>
                    <Checkbox>
                        Согласен со всем <Link>этим</Link>
                    </Checkbox>
                    <FormItem>
                        <Button size="l" stretched>
                            Зарегистрироваться
                        </Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    );
};

export default Registration;