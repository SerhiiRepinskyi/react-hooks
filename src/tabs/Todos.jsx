import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export const Todos = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) ?? []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); 

  const handleSubmit = string => {
    setTodos(prev => [...prev, { id: nanoid(), text: string }]);
  };

  const handleDelete = id => {
    setTodos(prev => prev.filter(el => el.id !== id));
  };

  const handleEdit = todo => {
    setTodos(prev =>
      prev.map(el => {
        if (el.id === todo.id) {
          el.text = todo.text;
        }
        return el;
      })
    );
  };

  return (
    <>
      <Text>Todos</Text>
      <SearchForm onSubmit={handleSubmit} />
      <Grid>
        {todos.map((el, index) => (
          <GridItem key={el.id}>
            <Todo
              text={el.text}
              id={el.id}
              handleDelete={handleDelete}
              index={index + 1}
              handleEdit={handleEdit}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
