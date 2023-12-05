import {Button, Container, Form} from "react-bootstrap";
import React, {Component, useState} from "react";
import textStyle from './create.css'

let toDoItems  =[
    {id: 1, title: 'test', completed: true},
    {id: 2, title: 'another test', completed: false},
    {id: 3, title: 'final mushroom test', completed: true},
];

export default class Create extends React.Component {
    constructor(props) {
        super(props); //we are calling constructor for the component
        this.state = { //makes the toDoItems variable is accessible in App
            todoList: toDoItems,
            showAddItemInput: false,
            newItemText: "",
            showPostType: true, //bool to show which radio is selected
            postType: 'post' //set the post type for radio button check
        }
    }

    // Upload image function
    handleFileChange = (e) => {
        const mush_img = e.target.files[0];

        if (mush_img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    selectedImage: mush_img,
                    imagePreview: reader.result,
                });
            };
            reader.readAsDataURL(mush_img);
        } else {
            this.setState({
                selectedImage: null,
                imagePreview: null,
            });
        }
    };

    renderItems = () => { //declaring function
        let listItems = []
        const todoList = this.state.todoList

        for (let i = 0; i < todoList.length; i++) {
            let item = todoList[i]
            let todoTitle = item.title

            //check if task is done
            if(item.completed){
                todoTitle += ' (done)'
            }

        }

        return listItems
    }

    switchPostView = () => { //switch the bool for the view
        this.setState({
            showForumType:false
        })
    }

    handleInputChange = (e) => { //autocomplete optional
        this.setState({newItemText: e.target.value})
    }

    render() {
        const newItemText = this.state.newItemText
        const showAddItemInput = this.state.showAddItemInput
        const showPostType = this.state.showPostType
        const { imagePreview } = this.state;

        return (
            <div className="row">
                {/*limit box to certain size*/}
                <div className="col-md-9 col-sm-10 mt-4 mx-auto">
                    <div className="card p-3">
                        <div className={"mb-4"}>

                            <h1 className={"m-1 mb-4"}>Create</h1>

                            {/*radio buttons*/}
                            <form className={"m-1 mb-5"}>
                                {/*radio post button*/}
                                <label className={"me-5"}>
                                <input type={"radio"}
                                   value={"post"}
                                   checked={this.state.postType === "post"}
                                       //make the radio button change when i click it
                                   onClick={() => this.setState({showPostType: true, postType: 'post'})}
                                   name={"create_type"}/>
                                Post
                            </label>

                                {/*radio forum button*/}
                            <label>
                                <input type={"radio"}
                                       value={"forum"}
                                       name={"create_type"}
                                       checked={this.state.postType === "forum"}
                                       onClick={() => this.setState({showPostType: false, postType: 'forum'})}
                                       className={"ms-3"}/>
                                Forum
                            </label>
                            </form>

                            {/*make conditional display*/}
                            {showPostType ? ( //if true, show post template
                                <div className={"d-inline-flex"} style={{width: "100%"}}>
                                    {/*image display*/}
                                    <div className={"ms-3 me-3"} style={{width: "25%"}}>
                                        {imagePreview && (
                                            <div className="mb-3">
                                                <p>Image Preview:</p>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{ maxHeight: "150px" }}
                                                />
                                            </div>
                                        )}
                                        {/*img upload*/}
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control type="file" onChange={this.handleFileChange} />
                                        </Form.Group>
                                    </div>

                                    {/*Title input field*/}
                                    <div className={"ms-3 me-3"} style={{width: "70%"}}>
                                        <input type={"text"}
                                               className={"mb-2 form-control"}
                                               value={newItemText}
                                               onChange={this.handleInputChange}
                                               placeholder={"Enter title..."}>
                                        </input>

                                        {/*Description input field*/}
                                        <div style={{height: "200px"}}>
                                    <textarea className={"textStyle form-control"}
                                              placeholder={"Enter description..."}>
                                    </textarea>
                                        </div>

                                        {/*submit button*/}
                                        <Button className={"mt-2"}>Create</Button>
                                    </div>


                                </div>
                            ) : ( //if false, show the forum template
                                <>
                                    {/*Title input field*/}
                                    <div style={{width: "100%"}}>
                                        <input type={"text"}
                                               className={"mb-2 form-control"}
                                               value={newItemText}
                                               onChange={this.handleInputChange}
                                               placeholder={"Enter title..."}>
                                        </input>

                                        {/*Description input field*/}
                                        <div style={{height: "200px"}}>
                                    <textarea className={"textStyle form-control"}
                                              placeholder={"Enter description..."}>
                                    </textarea>
                                        </div>

                                        {/*submit button*/}
                                        <Button className={"mt-2"}>Create</Button>
                                    </div>
                                </>
                            )}

                            {/*<ul className="list-group">*/}
                            {/*    {this.renderItems()}*/}
                            {/*</ul>*/}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
