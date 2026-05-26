import { formatScoreLabel, scoreValue } from '../scoreUtils';

describe('scoreUtils', () => {
  describe('formatScoreLabel', () => {
    it('should format positive custom scores with a plus sign', () => {
      expect(formatScoreLabel('Custom:3')).toBe('+3');
      expect(formatScoreLabel('Custom:1')).toBe('+1');
    });

    it('should format zero custom scores without a plus sign', () => {
      expect(formatScoreLabel('Custom:0')).toBe('0');
    });

    it('should format negative custom scores correctly', () => {
      expect(formatScoreLabel('Custom:-1')).toBe('-1');
    });

    it('should return the same label for non-custom scores', () => {
      expect(formatScoreLabel('Birdie')).toBe('Birdie');
      expect(formatScoreLabel('Par')).toBe('Par');
      expect(formatScoreLabel('Eagle')).toBe('Eagle');
      expect(formatScoreLabel('')).toBe('');
    });

    it('should handle invalid custom scores gracefully', () => {
      expect(formatScoreLabel('Custom:abc')).toBe('abc');
    });
  });

  describe('scoreValue', () => {
    it('returns -2 for Eagle', () => {
      expect(scoreValue('Eagle')).toBe(-2);
    });
    it('returns -1 for Birdie', () => {
      expect(scoreValue('Birdie')).toBe(-1);
    });
    it('returns 0 for Par', () => {
      expect(scoreValue('Par')).toBe(0);
    });
    it('returns 1 for Bogey', () => {
      expect(scoreValue('Bogey')).toBe(1);
    });
    it('returns 2 for Double', () => {
      expect(scoreValue('Double')).toBe(2);
    });
    it('returns NaN for empty string', () => {
      expect(scoreValue('')).toBe(NaN);
    });
    it('handles custom scores', () => {
      expect(scoreValue('Custom:3')).toBe(3);
      expect(scoreValue('Custom:-1')).toBe(-1);
    });
  });
});
