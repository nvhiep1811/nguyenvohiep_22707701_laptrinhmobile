import { todoApi } from "@/hook/useFetch";
import { AppDispatch, RootState } from "@/store/store";
import { todoAdded, todoDeleted, todosLoaded, todoToggled } from "@/store/todoSlice";
import { Todo } from "@/type/type";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function Index() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState('');
  
  const textInputRef = useRef(false); 
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await todoApi.getAll();
        const todo = res.data;
        dispatch(todosLoaded(todo));
      } catch {
        Alert.alert("Load", "Failed to load");
      }
    }
    
    loadData();
  },[dispatch]);

  const onAdd = async () => {
    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      textInputRef.current?.focus(); 
      Alert.alert("Error", "Please enter your todo.");
      return;
    }

    const res = await todoApi.add({text: trimmedText, completed: 0} as Todo);
    
    dispatch(todoAdded(res.data)); 

    setText('');
    textInputRef.current?.clear();
  }

  const onEdit = (id: string) => {
    router.push(`/edit/${id}`);
  }

  const onRemove = async (id: string) => {
    try {
      await todoApi.remove(id);
      dispatch(todoDeleted(id)); 
    } catch {
      Alert.alert("Delete ToDo", "Failed.");
    }
  }

  const onToggle = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      const newCompleted = todo.completed ? 0 : 1;
      await todoApi.toggle(id, newCompleted); 
      
      dispatch(todoToggled(id));       
    } catch {
      Alert.alert("Toggle", "Failed.");
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = (await todoApi.getAll()).data;
      await dispatch(res);
    } catch {
      Alert.alert("Error", "Failed to load.");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: '#f0f0f0'
      }}
    >
      <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>Todo List 📝</Text>
      
      <View style={{flexDirection: 'row', gap: 10, width: '100%', marginBottom: 20, alignItems: 'center'}}>
        <TextInput 
          ref={textInputRef}
          value={text} 
          onChangeText={setText} 
          style={{
            flex: 1, 
            backgroundColor: '#fff', 
            padding: 10, 
            borderRadius: 5, 
            borderWidth: 1,
            borderColor: '#ccc'
          }} 
          placeholder="Enter your task" 
        />
        <Button title="Add" onPress={onAdd} />
      </View>
      
      <View style={{flex: 1, width: '100%', paddingVertical: 10}}>
        <FlatList
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={['#007AFF']}
            />
          }
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Pressable 
              onPress={() => onToggle(item.id)} 
              style={{
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderWidth: 1, 
                borderColor: item.completed ? '#4CD964' : '#ccc',
                backgroundColor: '#fff',
                padding: 15, 
                borderRadius: 8, 
                elevation: 1
              }}>
              <Text 
                style={{
                  fontSize: 16, 
                  flex: 1,
                  marginRight: 10,
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                  color: item.completed ? '#777' : '#000'
                }}>
                {item.text}
              </Text>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Button title="Edit" onPress={() => onEdit(item.id)} color="#FF9500" />
                <Button title="Remove" onPress={() => onRemove(item.id)} color="#FF3B30" />
              </View>
            </Pressable>
          )}
          ListEmptyComponent={<Text style={{fontSize: 16, textAlign: 'center', color: '#777'}}>🎉List is empty!</Text>}
          contentContainerStyle={{gap: 10}}
        />
      </View>
    </View>
  );
}