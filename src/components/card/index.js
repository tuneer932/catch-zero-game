import React, { useRef, useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gameTime } from "../../constants/constants";
import { getTimeFormat } from "../../utils/commonMethods";
import styles from "./styles";

export default function Card(props) {
  const {
    score,
    currentNumber,
    updateNumber,
    setScore,
    isGameStarted,
    setIsGameStarted,
    setIsGameCompleted,
    setZeroCount,
    setDisplayedCount,
    setZeroClicked,
    setZeroSkipped,
    setNonZeroSkipped,
    setNonZeroClicked,
    zeroSkipped,
    zeroClicked,
    nonZeroClicked,
    nonZeroSkipped,
  } = props;
  const [timerString, setTimerString] = useState("");
  const timer = useRef(gameTime);
  const timerInterval = useRef(null);
  const numberInterval = useRef(null);

  const numberSkipped = () => {
    if (currentNumber.current === 0) {
      setScore(score.current - 3);
      setZeroSkipped(zeroSkipped.current + 1);
    } else {
      setScore(score.current + 1);
      setNonZeroSkipped(nonZeroSkipped.current + 1);
    }
    updateNumber();
  };

  const numberPressed = () => {
    if (currentNumber.current === 0) {
      setScore(score.current + 5);
      setZeroClicked(zeroClicked.current + 1);
    } else {
      setScore(score.current - 2.5);
      setNonZeroClicked(nonZeroClicked.current + 1);
    }
    updateNumber();
  };

  useEffect(() => {
    if (isGameStarted) {
      setTimeInterval();
      setNumberInterval();
    }

    return () => {
      clearAllIntervals();
    };
  }, [isGameStarted]);

  const setTimeInterval = () => {
    timerInterval.current = setInterval(() => {
      if (timer.current > 0) {
        timer.current = timer.current - 1;
        setTimerString(getTimeFormat(parseInt(timer.current)));
      } else {
        clearAllIntervals();
        setIsGameCompleted(true);
      }
    }, 1000);
  };

  const setNumberInterval = () => {
    numberInterval.current = setInterval(() => {
      numberSkipped();
    }, 2000);
  };

  const clearAllIntervals = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    if (numberInterval.current) {
      clearInterval(numberInterval.current);
    }
  };

  const reStartGame = () => {
    clearAllIntervals();
    timer.current = gameTime;
    setIsGameStarted(true);
    setIsGameCompleted(false);
    updateNumber();
    setScore(0);
    setTimeInterval();
    setNumberInterval();
    setDisplayedCount(0);
    setZeroCount(0);
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.countText}>Live Score: {score.current}</Text>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => numberPressed()}
      >
        <Text style={styles.innerCardText}>
          {isGameStarted ? currentNumber.current : 0}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.timerCardText]}>
        {isGameStarted ? timerString : "00:00"}
      </Text>
      <View
        style={{
          width: "50%",
          alignSelf: "center",
        }}
      >
        <Button
          title={isGameStarted ? "restart game" : "start game"}
          onPress={() => {
            reStartGame();
          }}
        />
      </View>
    </View>
  );
}
