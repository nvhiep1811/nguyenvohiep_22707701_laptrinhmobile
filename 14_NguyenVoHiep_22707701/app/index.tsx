import { getAllCategories } from "@/db/category.repo";
import { Category } from "@/model/type";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from "react-native";

export default function Index() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Category[]>([]);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setData(res);
    } catch (error) {
      Alert.alert("Error", "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size={30} color={'skyblue'}/>
    );
  }

  const renderItem = ({ item }: { item: Category }) => (
    <Pressable
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onPress={() => {
        router.push(`/category/${item.id.toString()}`);
      }
      }
    >
      <Text style={{fontSize: 20, textAlign: 'center'}}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Choose a catgegory:</Text>
      <FlatList ItemSeparatorComponent={() => <View style={{height: 10}}></View>} data={data} keyExtractor={item => item.id.toString()}
        renderItem={renderItem} />
    </View>
  );
}
