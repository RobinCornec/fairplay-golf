import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { GameSetup } from '../GameSetup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n } from '../../localization';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../../localization', () => ({
  i18n: {
    t: (key: string) => key,
  },
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    MD3LightTheme: {
        colors: {}
    },
    configureFonts: jest.fn(),
    Text: (props: any) => <Text {...props} />,
    TextInput: (props: any) => <View {...props} />,
    Button: (props: any) => <View {...props} />,
    Card: Object.assign((props: any) => <View {...props} />, {
      Title: (props: any) => <View {...props} />,
      Content: (props: any) => <View {...props} />,
    }),
    IconButton: (props: any) => <View {...props} />,
  };
});

jest.mock('../../components/RulesModal', () => ({
  RulesModal: () => null,
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('GameSetup Crash Reproduction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does NOT crash when inProgressGame has missing game6pointScores', async () => {
    const badGameData = {
      date: new Date().toISOString(),
      players: ['Player 1', 'Player 2', 'Player 3'],
      scores: [],
      // game6pointScores is missing or undefined
      totalScores: { 'Player 1': 0, 'Player 2': 0, 'Player 3': 0 },
      inProgress: true,
      holes: 9,
      currentHole: 1,
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([badGameData]));

    const spy = jest.spyOn(console, 'error').mockImplementation((...args) => {
        console.log('STDOUT_LOG: Caught console error:', args[0]);
    });
    
    const { getAllByText } = render(<GameSetup navigation={mockNavigation} />);
    
    // Wait for the useEffect and re-render
    await waitFor(() => {
        // Check that it shows Player 1
        const player1 = getAllByText('Player 1');
        expect(player1.length).toBeGreaterThan(0);
        
        // Check that it shows 0 🦉 instead of crashing
        const owls = getAllByText(/0 🦉/);
        expect(owls.length).toBeGreaterThan(0);
    });
  });
});
