import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PanResponder,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Searchbar, Snackbar } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

type JobItem = {
  id: number;
  name: string;
  logo: string;
  role: string;
  location: string;
  promoted: boolean;
};

const data: JobItem[] = [
  {
    id: 1,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
    role: "Software Engineer 2",
    location: "San Jose, CA",
    promoted: true,
  },
  {
    id: 2,
    name: "Apple",
    logo: "https://example.com/apple-logo.png",
    role: "iOS Developer",
    location: "Cupertino, CA",
    promoted: false,
  },
  {
    id: 3,
    name: "Google",
    logo: "https://example.com/google-logo.png",
    role: "Software Engineer 3",
    location: "Mountain View, CA",
    promoted: true,
  },
  {
    id: 4,
    name: "Google",
    logo: "https://example.com/google-logo.png",
    role: "Software Engineer 3",
    location: "Mountain View, CA",
    promoted: true,
  },
  {
    id: 5,
    name: "Google",
    logo: "https://example.com/google-logo.png",
    role: "Software Engineer 3",
    location: "Mountain View, CA",
    promoted: true,
  },
  {
    id: 6,
    name: "Google",
    logo: "https://example.com/google-logo.png",
    role: "Software Engineer 3",
    location: "Mountain View, CA",
    promoted: true,
  },
  // Other items...
];

const SwipeableCard: React.FC<{
  item: JobItem;
  onSwipe: (itemId: number, isRightSwipe: boolean) => void;
}> = ({ item, onSwipe }) => {
//   const navigation = useNavigation();
const pan = useRef(new Animated.ValueXY()).current;
//   const [swiped, setSwiped] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > 5 || Math.abs(dy) > 5,
      onPanResponderMove: useCallback((_, { dx }) => {
        pan.x.setValue(dx);
      }, [pan]),
      onPanResponderRelease: (_, { dx }) => {
        const isSwipedRight = dx > 0;
        const isSwiped = Math.abs(dx) > 100;

        if (isSwiped) {
          Animated.timing(pan.x, {
            toValue: isSwipedRight ? 300 : -300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            // setSwiped(true);
            onSwipe(item.id, isSwipedRight);
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const dynamicStyles = {
    transform: pan.getTranslateTransform(),
    backgroundColor: pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ["red", "#fff", "green"],
      }),
      
  };

  return (
    <Animated.View
      style={[styles.card, dynamicStyles]}
      {...panResponder.panHandlers}
    >
      <View style={{ width: "40%" }}>
        <Image
          source={{ uri: item.logo }}
          style={{ width: "50%", height: 50, marginBottom: 10 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "700", fontSize: 15 }}>{item.name}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 17, fontWeight: "700" }}> {item.role} </Text>
        <Text style={{ marginTop: 7 }}>
          {" "}
          <EvilIcons name="location" size={15} color="#015AAA" />{" "}
          {item.location}{" "}
        </Text>

        {item.promoted && (
          <Text
            style={{
              backgroundColor: "#015AAA",
              width: "47%",
              padding: 4,
              borderRadius: 10,
              color: "white",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Promoted
          </Text>
        )}
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate("JobDetailScreen")}
        style={styles.viewDetailsButton}
      >
        <Text style={{ color: "#015AAA" }}>View Details </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Test: React.FC = () => {
  const [items, setItems] = useState<JobItem[]>(data);

//   const renderSwipeableCard: React.FC<{ item: JobItem }> = ({ item }) => {
//     return <SwipeableCard item={item} onSwipe={handleSwipe} />;
//   };

  const handleSwipe = (itemId: number, isRightSwipe: boolean) => {
    setVisible(true);
    const swipeDirection = isRightSwipe ? "right" : "left";
    setD(swipeDirection);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [visible, setVisible] = useState(false);
  const [d, setD] = useState<string | undefined>();

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        // style={{ backgroundColor: "White" }}
        rippleColor="white"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <SwipeableCard item={item} onSwipe={handleSwipe} />
          )}
        // renderItem={({ item }) => renderSwipeableCard({ item })} 
        
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "close",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {d === "left" ? "Not Interesed" : "Job Applied!!"}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    width: "95%",
    marginHorizontal: 10,
  },
  card: {
    padding: 20,
    width: "95%",
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewDetailsButton: {
    position: "absolute",
    bottom: 10,
    right: 0,
    padding: 5,
  },
});

export default Test;
