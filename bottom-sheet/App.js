import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import BottomSheet from "./bottom-sheet/BottomSheet";

export default function App() {
  const [show, setShow] = useState(true);
  return (
    <Provider>
      <View style={styles.container}>
        <Button onPress={() => setShow(true)} title="Show Bottom Sheet" />
        <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {Array.from({ length: 40 }).map((_, index) => (
              <Text key={index}>Text - {index + 1}</Text>
            ))}
          </ScrollView>
        </BottomSheet>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
