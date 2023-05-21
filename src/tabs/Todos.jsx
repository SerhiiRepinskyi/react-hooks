import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleSubmit = string => {
    this.setState(prev => ({
      todos: [...prev.todos, { id: nanoid(), text: string }],
    }));
  };

  handleDelete = id => {
    this.setState(prev => ({
      todos: prev.todos.filter(el => el.id !== id),
    }));
  };

  handleEdit = todo => {
    this.setState(prev => ({
      todos: prev.todos.map(el => {
        if (el.id === todo.id) {
          el.text = todo.text;
        }
        return el;
      }),
    }));
  };

  render() {
    return (
      <>
        <Text>Todos</Text>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {this.state.todos.map((el, index) => (
            <GridItem key={el.id}>
              <Todo
                text={el.text}
                id={el.id}
                handleDelete={this.handleDelete}
                index={index + 1}
                handleEdit={this.handleEdit}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
