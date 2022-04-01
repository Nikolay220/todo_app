import React from "react";
import { formatDistanceToNow } from 'date-fns';
// function onChangeHandler(event){
//     event.target.value = event.target.value;
// };
import "./task.css";

class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:"Editing task"};
        this.onChangeHandler=this.onChangeHandler.bind(this);
    }
    onChangeHandler(event){
        this.setState({value:event.target.value});
    };
    render(){
        return (
            <div>
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description">{this.props.itemProps.description}</span>
                        <span className="created">{formatDistanceToNow(this.props.itemProps.created,{includeSeconds:true})}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                {(this.props.itemProps.status === "editing")&&<input type="text" className="edit" value={this.state.value} onChange={this.onChangeHandler}></input>}
            </div>
        ); 
    }
}


export default Task;