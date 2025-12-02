import { todoApi } from '@/hook/useFetch';
import { AppDispatch, RootState } from '@/store/store';
import { todoUpdated } from '@/store/todoSlice';
import { Todo } from '@/type/type';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function EditToDo() {
  const { id } = useLocalSearchParams();

  const todo = useSelector((state: RootState) =>
    state.todos.find(t => t.id === id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const textRef = useRef(null);

  const [text, setText] = useState(todo ? todo.text : '');
  
  useEffect(() => {
    if (!id || !todo) {
      Alert.alert("Error", "Not found.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }
  }, [id, todo]);
  
  if (!id || !todo) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đang tải hoặc không tìm thấy...</Text>
    </View>;
  }

  const todoData = todo as Todo;
  
  const onEdit = async () => {
    if (text.trim() === '') {
      Alert.alert("Error", "Text mustn't be empty.");
      return;
    }
    
    await todoApi.update(id as string, {...todo, text})
                  .then(res => dispatch(todoUpdated(res.data))); 
    
    router.back();
  }

  return (
    <View style={{padding: 10, gap: 10, alignItems: 'center'}}>
      <TextInput 
        ref={textRef} 
        value={text} 
        onChangeText={setText} 
        style={{width: '100%', backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: '#ccc'}} 
        placeholder="Enter your task" 
      />
      <Button title="Update" onPress={onEdit} disabled={text.trim() === todoData.text.trim() || text.trim() === ''} />
    </View>
  )
}