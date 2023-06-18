import React, {useState} from "react";
import MyButton from "./UI/dutton/MyButton";
import {Button} from "@vkontakte/vkui";
//Прорисовка блока события в ленте
const PostItem = (props) =>{
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id} {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <Button stretched size="l" mode="secondary">
                    подписаться
                </Button>

                {/*<MyButton disabled> подписаться </MyButton>*/}
            </div>
        </div>

    );
};
export default PostItem;