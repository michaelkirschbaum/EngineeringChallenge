import {Button, Platform, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Link, useFocusEffect} from 'expo-router';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {PartsOfMachine} from '../../components/PartsOfMachine';
import {MachineScore} from '../../components/MachineScore';

let apiUrl: string =
  'https://fancy-dolphin-65b07b.netlify.app/api/machine-health';

if (__DEV__) {
  apiUrl = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001/machine-health`;
}

export default function StateScreen() {
  const dispatch = useDispatch();
  const machines = useSelector((state) => state.machineData.machines);
  const scores = useSelector((state) => state.machineData.scores);

  const calculateHealth = useCallback(async () => {
    try {
      const response = await axios.post(apiUrl, {
        machines: machines,
      });

      if (response.data?.factory) {
        // set response in state
        dispatch({ type: 'UPDATE_SCORES', payload: { ...response.data }});
      }
    } catch (error) {
      console.error(error);
      console.log(
        `There was an error calculating health. ${
          error.toString() === 'AxiosError: Network Error'
            ? 'Is the api server started?'
            : error
        }`,
      );
    }
  }, [machines]);

  const resetMachineData = () => {
    // clear machine state
    dispatch({ type: 'RESET_MACHINE_DATA' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {!machines && (
        <Link href='/two' style={styles.link}>
          <Text style={styles.linkText}>
            Please log a part to check machine health
          </Text>
        </Link>
      )}
      {machines && (
        <>
          <PartsOfMachine
            machineName={'Welding Robot'}
            parts={machines?.weldingRobot}
          />
          <PartsOfMachine
            machineName={'Assembly Line'}
            parts={machines?.assemblyLine}
          />
          <PartsOfMachine
            machineName={'Painting Station'}
            parts={machines?.paintingStation}
          />
          <PartsOfMachine
            machineName={'Quality Control Station'}
            parts={machines?.qualityControlStation}
          />
          <View
            style={styles.separator}
            lightColor='#eee'
            darkColor='rgba(255,255,255,0.1)'
          />
          <Text style={styles.title}>Factory Health Score</Text>
          <Text style={styles.text}>
            {scores?.factory
              ? scores?.factory
              : 'Not yet calculated'}
          </Text>
          {scores?.machineScores && (
            <>
              <Text style={styles.title2}>Machine Health Scores</Text>
              {Object.keys(scores?.machineScores).map((key) => (
                <MachineScore
                  key={key}
                  machineName={key}
                  score={scores?.machineScores[key]}
                />
              ))}
            </>
          )}
        </>
      )}
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button title='Calculate Health' onPress={calculateHealth} />
      <View style={styles.resetButton}>
        <Button
          title='Reset Machine Data'
          onPress={resetMachineData}
          color='#FF0000'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  text: {},
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  resetButton: {
    marginTop: 10,
  },
});
