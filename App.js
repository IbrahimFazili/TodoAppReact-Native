  
import React from "react";
import {View, Button, Text, ScrollView, StyleSheet, Switch} from "react-native";


const styles = StyleSheet.create({
  todoStyle: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  appStyle: {
    paddingTop: 50,
  },
  fill: {
    flex: 1,
  }
})

const Todo = props => (
  <View style = {styles.todoStyle}>
    <Switch value={props.checked} onValueChange={props.onToggle}/>
    <Button onPress={props.onDelete} title="Delete"></Button>
    <Text>{props.todo.text}</Text>
  </View>
)

let id = 0

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
    }
  }

  toggleTodo(id){
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
  
  addTodo(){
    id++
    const text = `TODO number ${id}`
    this.setState({
      todos: [...this.state.todos, 
        {id: id, text: text, checked: false}],
    })
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  render(){
    return (
    <View style = {[styles.appStyle, styles.fill]}>
      <Text>TODO COUNT: {this.state.todos.length}</Text>
      <Text>UNCHECKED TODO: 
      {this.state.todos.filter(todo => !todo.checked).length}</Text>
      <Button onPress={() => this.addTodo()} title="ADD TODO"></Button>
      <ScrollView>
        {this.state.todos.map(todo => 
        <Todo 
        onToggle={() => this.toggleTodo(todo.id)}
        onDelete={() => this.removeTodo(todo.id)}
        todo={todo}/>
        )}
        </ScrollView>
      </View>
    )
  }
}
