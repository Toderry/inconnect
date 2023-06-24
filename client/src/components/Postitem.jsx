import React, {useState} from "react";
import MyButton from "./UI/dutton/MyButton";
import {Button, ButtonGroup, Epic} from "@vkontakte/vkui";
//Прорисовка блока события в ленте
import {ROUTES} from "../routes";
const PostItem = (props) =>{
    return (
        <>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id} {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>

                <div className="post__btns">
                    <ButtonGroup mode="vertical" gap="s" stretched>

                        <Button stretched size="m" mode="secondary"
                                onClick={() => {props.setActiveStory(ROUTES.EVENTPAGE);
                                    props.setCurrentPost(props.post);
                                }}
                                data-to="eventpage"
                        >

                            подробнее
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </>




    );
};

export default PostItem;