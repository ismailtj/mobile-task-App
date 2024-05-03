import React, { useState } from "react";
import { Text, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default SwipeableListItem = ({ item, onDelete, onPress }) => {
  const [dragX] = useState(new Animated.Value(0));
  const swipeableRef = React.useRef(null);

  const renderRightActions = (_, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        onPress={() => onDelete(item._id)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <Animated.Text
          style={{ color: "red", transform: [{ translateX: trans }] }}
        >
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(_, dragX) => renderRightActions(item, dragX)}
      overshootRight={false}
      onSwipeableRightOpen={() => onDelete(item._id)}
    >
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{
          backgroundColor: item.done ? "#80d2ff" : "#fff",
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: "#888" }}>{item._id}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};
