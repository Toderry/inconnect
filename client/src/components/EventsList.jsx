import React, {useState} from "react";
import PostItem from "./Postitem";
//posts, title, setActiveStory, currentPost, setCurrentPost
const EventsList = (props) => {
    return(
        <div>
            <h1 style={{textAlign:'center'}}>
				{props.title}
			</h1>
            {props.posts.map((post) =>
                <PostItem post={post} key={post.id} setActiveStory={props.setActiveStory}
                        currentPost={props.currentPost} setCurrentPost={props.setCurrentPost}
                        previousPage = {props.previousPage} setPreviousPage = {props.setPreviousPage}/>
            )}

        </div>
    );
};
export default EventsList;