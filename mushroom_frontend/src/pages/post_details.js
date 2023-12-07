import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {reformatDate, reformatTime} from './home'

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    // const date = reformatDate(post.datetime)
    // const time = reformatTime(post.datetime)

    //fetch on mount: remember when doing for forum VVV
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`);
                const postData = await response.json();
                setPost(postData); //update the state with the fetched data

                console.log('post.datetime:', postData.datetime);
            } catch (error) {
                console.error('Problem with the fetch for post details', error);
            }
        };

        fetchPostDetails();
    }, [id]);

    return (
        <div>
            <Link to="/">Go back to home</Link>
            <div className="col-md-9 col-sm-10 mt-4 mx-auto">
                <div className={"card"}>
                    <div className={"imgdisplay"}>
                        {/*displays the img posted by user if it exists*/}
                        {post.img ? (
                            <img className={"photosizing"} src={`http://127.0.0.1:8000${post.img}`} alt={post.img} />
                        ) : (
                            // Display a placeholder image if post.img is not present
                            <img className={"photosizing"} src={`http://127.0.0.1:8000/media/uploads/placeholder.png`} alt="Placeholder" />
                        )}
                    </div>
                    {/*text box display*/}
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>Posted by: {post.user && post.user.username}</p>

                        {/*no more crash on load*/}
                        <p>{post.datetime && `${reformatDate(post.datetime)} ${reformatTime(post.datetime)}`}</p>

                    </div>
                </div>
            </div>
    </div>

);
}

export default PostDetails;
