import React from "react";
import { Text, View, Button } from "react-native";
import styles from "./styles";

export default function CompletedCard(props) {
  const { score, displayedCount, zeroCount, resetGame } = props;

  return (
    <View style={styles.mainView}>
      <Text style={styles.countText}>Game Over</Text>
      <Text style={styles.countText}>You Scored: {score.current}</Text>
      <View style={[styles.container]}>
        <Text style={[styles.timerCardText]}>
          Total numbers displayed: {displayedCount.current}
        </Text>
        <Text style={[styles.timerCardText]}>
          Total 0's displayed: {zeroCount.current}
        </Text>
      </View>

      <Button
        title="Reset game"
        onPress={() => {
          resetGame();
        }}
      />
    </View>
  );
}
