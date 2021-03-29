 import React, { Component } from 'react';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newItem:{name : '',start :'',end:''},
            list : []
        }
        this.valuechange = this.valuechange.bind(this)  
    }
    addItem(todoValue){
        if(todoValue!==""){
            const newItem = {
                id: Date.now(),
                value:todoValue,
                isDone : false
            };
            const list = [...this.state.list];
            list.push(newItem);
            this.setState({
                list,
                newItem:""
            });
        }
    }
    deleteItem(id){
        const list =[...this.state.list]
        const updatedlist = list.filter(item => item.id!==id);
        this.setState({
            list :updatedlist
        })

    }
    updateInput(id,input){
        this.setState({newItem:input});
    }
    valuechange(e,i){
        const list = [...this.state.list];
        list[e.e] = i.target.value
        this.setState({
            list
            
        })

    }
    render() {
        return (
            <div>
              {/*  <img src={logo} width="100" height="100" className="logo" />*/}
                <h1 className="app-title">dont react</h1>
                <div className="container">
                    Add an Item...
                    <br />
                    <input
                        type="text"
                        className="input-text"
                        placaeholder="write a to do"
                        required
                        value={this.state.newItem.name}
                        onChange={e=>this.updateInput(e.target.value,"name")} />
                        <input
                        type="text"
                        className="input-text"
                        placaeholder="write a to do"
                        required
                        value={this.state.newItem.start}
                        onChange={e=>this.updateInput(e.target.value)} />
                         <input
                        type="text"
                        className="input-text"
                        placaeholder="write a to do"
                        required
                        value={this.state.newItem.end}
                        onChange={e=>this.updateInput(e.target.value)} />
                    
                    <button className="add-btn"
                    onClick={()=>this.addItem(this.state.newItem)}
                    disabled ={!this.state.newItem.length}
                    >Addtodo</button>
                    <div className = "list">
                        <ul>
                            {this.state.list.map(item=>{
                                return(
                                    <li key={item.id}>
                                        <input
                                        type ="checkbox"
                                        name="idDone"
                                        checked={item.isDone}
                                        onChange={()=>{}}
                                        />
                                       
                                       {item.name}
                            
                                
                                    
                                        <button className ="btn"
                                        onClick ={()=>this.deleteItem(item.id)}>delete</button>
                                    </li>

                                );
                            })}
                            <li>
                                <input type="checkbox" name="" id=""/>
                                Record youtube videos
                                <button className ="btn">Delete</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        );
    }

}
export default App
