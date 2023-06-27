import React, {useState} from "react";
import PostItem from "./Postitem";
const EventsList = ({posts, title, setActiveStory, currentPost, setCurrentPost}) => {

    return(
        <div>
            <h1 style={{textAlign:'center'}}>
				{title}
			</h1>
            {posts.map((post) =>
                <PostItem post={post} key={post.id} setActiveStory={setActiveStory} currentPost={currentPost}
                          setCurrentPost={setCurrentPost}/>
            )}

        </div>
    );
};
export default EventsList;