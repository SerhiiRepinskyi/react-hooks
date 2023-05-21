import { useState } from 'react';
import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, id, handleDelete, index, handleEdit }) => {
  const [newText, setNewText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO {index}
      </Text>

      {isEdit ? (
        <input
          onBlur={() => {
            setIsEdit(false);
            handleEdit({ id, text: newText });
          }}
          autoFocus
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
      ) : (
        <Text onClick={() => setIsEdit(true)}>{text}</Text>
      )}
      <DeleteButton type="button" onClick={() => handleDelete(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    </TodoWrapper>
  );
};
