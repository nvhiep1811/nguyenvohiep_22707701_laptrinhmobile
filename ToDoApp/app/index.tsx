import { todoApi } from "@/hook/useFetch";
import { addToDo, loadFromDB, removeToDo, toggleTodo } from "@/store/todoSlice";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const todo = useSelector(state => state.todo);
  const dispatch = useDispatch();
  const [text,setText] = useState('');
  const textRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await todoApi.getAll();
        dispatch(loadFromDB(res.data));
      } catch (e) {
        dispatch(loadFromDB([]));
      }
    };

    fetchData();
  }, [dispatch]);

  const onAdd = () => {
    if (text.trim().length === 0) {
      textRef.current.focus();
      return;
    }
    dispatch(addToDo({id: Date.now(), text, completed: 0}));
  }

  const onEdit = (id: number) => {
    router.push({pathname: `/edit/${id}`, params: {id}});
  }

  const onRemove = (id: number) => {
    dispatch(removeToDo(id));
  }

  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Todo List</Text>
      <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>        
        <TextInput ref={textRef} value={text} onChangeText={setText} 
          style={{width: '100%', backgroundColor: '#fff', padding: 10}} 
          placeholder="Enter your task" />
        <Button title="Add" onPress={onAdd}  />
      </View>
      <View style={{flex: 1, width: '100%', paddingVertical: 10}}>
        <FlatList
          data={todo}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Pressable onPress={() => onToggle(item.id)} style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, padding: 10, borderRadius: 5}}>
              <Text style={{fontSize: 16, textDecorationLine: item.completed ? 'line-through' : 'none'}}>{item.text}</Text>
              <View style={{flexDirection: 'row', gap: 5}}>                
                <Button title="Edit" onPress={() => onEdit(item.id)} />
                <Button title="Remove" onPress={() => onRemove(item.id)} />
              </View>
            </Pressable>)
          }
          ListEmptyComponent={<Text style={{fontSize: 16, textAlign: 'center'}}>List is empty!</Text>}
          ItemSeparatorComponent={<View style={{height: 10}}></View>}
        />
      </View>
    </View>
  );
}
