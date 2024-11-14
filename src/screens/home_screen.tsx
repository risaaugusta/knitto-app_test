import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useGetImagesQuery } from "../redux/pixabay_api";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton, MD3Colors, Searchbar } from "react-native-paper";

const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const { data, error, isLoading, isFetching } = useGetImagesQuery({
    query: searchQuery,
    page,
  });

  const loadMoreImages = () => {
    if (data && !isFetching) {
      setPage(page + 1);
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id)
        ? prev.filter((bookmarkedId) => bookmarkedId !== id)
        : [...prev, id]
    );
  };

  const renderItem = ({ item }: any) => {
    const isBookmarked = bookmarked.includes(item.id);
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.webformatURL }} style={styles.image} />
        <View>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.tags}>{item.tags}</Text>
        </View>
        <Icon
          style={styles.bookmark}
          name={isBookmarked ? "bookmark" : "bookmark-o"}
          color="grey"
          size={20}
          onPress={() => toggleBookmark(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.textInput}
        placeholder="Search.."
      />
      <Text style={{marginBottom: 10}}>Search for: {searchQuery}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data?.hits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        />
      )}
      {error && <Text>Error fetching data</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  item: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    flexDirection: "row",
    alignContent: "space-around",
  },
  image: {
    width: "50%",
    height: 100,
    marginBottom: 8,
  },
  textInput: {
    // width: 280,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  user: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
  },
  tags: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: 130,
  },
  bookmark: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "baseline",
  },
});

export default HomeScreen;
