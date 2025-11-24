import { editToDo } from '@/store/todoSlice';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function EditToDo() {
  const {id} = useLocalSearchParams();
  const todo = useSelector((state) =>
        state.todo.find(t => t.id.toString() === id)
    );
  const dispatch = useDispatch();
  const [text,setText] = useState(todo.text);
  const textRef = useRef(null);
  
  const onEdit = () => {
    dispatch(editToDo({id: Number(id), todo: {...todo, text}}));
    
    router.back();
  }

  return (
    <View style={{padding: 10, gap: 10, alignItems: 'center'}}>        
      <TextInput ref={textRef} value={text} onChangeText={setText} 
        style={{width: '100%', backgroundColor: '#fff', padding: 10}} 
        placeholder="Enter your task" />
      <Button title="Update" onPress={onEdit} />
    </View>
  )
}
