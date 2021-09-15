import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import Card from "../../components/card";
import CompletedCard from "../../components/CompletedCard";
import Header from "../../components/header";
import { randomNumber } from "../../utils/commonMethods";
import styles from "./styles";

export default function Main() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const currentNumber = useRef(randomNumber());
  const score = useRef(0);
  const zeroCount = useRef(0);
  const displayedCount = useRef(0);

  const setScore = (value) => {
    score.current = value;
  };

  const setZeroCount = (value) => {
    zeroCount.current = value;
  };

  const setDisplayedCount = (value) => {
    displayedCount.current = value;
  };

  const updateNumber = () => {
    let newNumber = randomNumber();
    if (newNumber === 0) {
      setZeroCount(zeroCount.current + 1);
    }
    setDisplayedCount(displayedCount.current + 1);
    currentNumber.current = newNumber;
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameCompleted(false);
    setScore(0);
  };

  return (
    <View>
      <Header isGameCompleted={isGameCompleted} />
      <View style={styles.mainView}>
        {isGameCompleted ? (
          <CompletedCard
            score={score}
            zeroCount={zeroCount}
            displayedCount={displayedCount}
            resetGame={resetGame}
          ></CompletedCard>
        ) : (
          <Card
            isGameStarted={isGameStarted}
            setIsGameStarted={setIsGameStarted}
            isGameCompleted={isGameCompleted}
            setIsGameCompleted={setIsGameCompleted}
            currentNumber={currentNumber}
            updateNumber={updateNumber}
            setScore={setScore}
            score={score}
            setZeroCount={setZeroCount}
            setDisplayedCount={setDisplayedCount}
          ></Card>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
