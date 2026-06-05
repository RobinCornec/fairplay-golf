// Score label type
export type ScoreLabel = 'Eagle' | 'Birdie' | 'Par' | 'Bogey' | 'Double' | 'Custom' | '' | string;

// Hole score type (player name to score label)
export type HoleScore = Record<string, ScoreLabel>;

// Player score type (player name to numeric score)
export type PlayerScore = Record<string, number>;

// Player medal type (player name to medal emoji)
export type PlayerMedal = Record<string, string>;

// Hole score with player name and value
export interface PlayerHoleScore {
  name: string;
  label: ScoreLabel;
  value: number;
}

// Game data structure for storage
export interface GameData {
  date: string;
  players: string[];
  scores: HoleScore[];
  totalScores: PlayerScore;
  game6pointScores: PlayerScore;
  inProgress?: boolean;
  holes?: number;
  currentHole?: number;
  gameType?: string;
}

// Navigation types
export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  GameSetup: undefined;
  GameScore: { 
    players: string[]; 
    holes: number;
    game?: GameData; // Optional game data for continuing a game
    gameType?: string;
  };
  GameRecap: {
    players: string[];
    scores: HoleScore[];
    totalScores: PlayerScore;
    game6pointScores: PlayerScore;
  };
  History: undefined;
};
