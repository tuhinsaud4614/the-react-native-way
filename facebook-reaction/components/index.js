import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { View as MotiView, AnimatePresence } from "moti";
import CustomButton from "./CustomButton";
import EmojiLike from "./svg-emoji/EmojiLike";
import EmojiLove from "./svg-emoji/EmojiLove";
import EmojiCare from "./svg-emoji/EmojiCare";
import EmojiAngry from "./svg-emoji/EmojiAngry";
import EmojiHaha from "./svg-emoji/EmojiHaha";
import EmojiWow from "./svg-emoji/EmojiWow";
import EmojiSad from "./svg-emoji/EmojiSad";
import Backdrop from "./Backdrop";
import EmojiItem from "./EmojiItem";
import Hint from "./Hint";
import { PanGestureHandler } from "react-native-gesture-handler";

const items = [
  { emoji: <EmojiLike />, title: "like", color: "rgb(32, 120, 244)" },
  { emoji: <EmojiLove />, title: "love", color: "rgb(243, 62, 88)" },
  { emoji: <EmojiCare />, title: "care", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiHaha />, title: "haha", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiWow />, title: "wow", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiSad />, title: "sad", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiAngry />, title: "angry", color: "rgb(233, 113, 15)" },
];

const ReactionBox = () => {
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const onGesture = (event) => {
    // when gesture gone outside the container
    if (
      event.nativeEvent.absoluteY >= 310 &&
      event.nativeEvent.absoluteY <= 490 &&
      event.nativeEvent.absoluteX >= 16 &&
      event.nativeEvent.absoluteX <= 367
    ) {
      setShowHint(false);
      // when move finger beside any of emoji should select
      const currentItem = Math.floor(event.nativeEvent.x / 50);
      if (currentItem >= 0 && currentItem < items.length) {
        setCurrent(currentItem);
      } else {
        setCurrent(null);
      }
    } else {
      setCurrent(null);
      setShowHint(true);
    }
  };

  const gestureEnded = () => {
    // When gesture ended
    setShow(false);
    setShowHint(false);
  };

  const btnPressHandler = () => {
    setCurrent(null);
    setShow(true);
    setShowHint(false);
  };

  const onClose = () => {
    setShow(false);
    setShowHint(false);
    setCurrent(null);
  };

  const emojiPressHandler = (index) => {
    setShow(false);
    setShowHint(false);
    setCurrent(index);
  };

  return (
    <View style={styles.root}>
      <AnimatePresence>
        {show && (
          <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
            <MotiView
              style={styles.container}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MotiView
                style={styles.floatBox}
                from={{ translateY: 40, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 40, opacity: 0 }}
                transition={{ duration: 800 }}
              >
                <View style={styles.emojiBox}>
                  {items.map((item, index) => (
                    <EmojiItem
                      onPress={() => emojiPressHandler(index)}
                      key={item.title}
                      data={item}
                      index={index}
                      scaled={current === index}
                    />
                  ))}
                </View>
              </MotiView>
            </MotiView>
          </PanGestureHandler>
        )}
      </AnimatePresence>
      {show && <Hint hint={showHint} />}
      {show && <Backdrop onPress={onClose} />}
      <CustomButton
        onLongPress={btnPressHandler}
        color={current === null ? "#000" : items[current].color}
        emoji={items[current === null ? 0 : current].emoji}
        text={items[current === null ? 0 : current].title}
      />
    </View>
  );
};

export default ReactionBox;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 180,
    // backgroundColor: "red",
    justifyContent: "center",
    zIndex: 10,
  },
  floatBox: {
    alignItems: "center",
  },
  emojiBox: {
    flexDirection: "row",
    borderRadius: 33,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 1,
  },
});
