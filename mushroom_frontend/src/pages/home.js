import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedForums: [],
            formattedPosts: [],
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/forums/") //get forum full list
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not okay")
                }
                return response.json();
            })
            .then(forums => {
                const formattedForums = forums.map(forum => ({
                    ...forum,
                    title: forum.description
                }));
                this.setState({ formattedForums });
            })
            .catch(error => {
                console.error('Problem with the fetch', error)
            });
    }

    render() {
        return (
            <div>
                <h2>Forum Posts</h2>
                <ul>
                    {this.state.formattedForums.map(forum => (
                        <li key={forum.id}>
                            <strong>{forum.title}</strong>
                            <p>{forum.description}</p>
                            <p>Time: {forum.datetime}</p>
                            <p>User: {forum.user}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Home;
