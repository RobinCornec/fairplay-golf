# Development Guide for GWolf App

This document provides project-specific information for developers working on the GWolf App.

## Build and Configuration

The project is built with **Expo** and **React Native**.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI (`npx expo`)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npx expo start
   ```

### Troubleshooting
- If `npm` or `node` is not in your PATH, ensure `/usr/local/bin` (or your specific installation path) is included.
- For dependency conflicts during installation, use `--legacy-peer-deps`.

## Testing

The project uses **Jest** and **jest-expo** for testing.

### Running Tests
Run the following command to execute all tests:
```bash
npm test
```

### Adding New Tests
- Place test files in `__tests__` directories adjacent to the code being tested or use the `.test.ts` / `.spec.ts` suffix.
- Use `@testing-library/react-native` for component testing.
- Example test for a utility function:
  ```typescript
  import { scoreValue } from '../scoreUtils';

  describe('scoreValue', () => {
    it('returns -2 for Eagle', () => {
      expect(scoreValue('Eagle')).toBe(-2);
    });
  });
  ```

### Configuration
Jest is configured via `jest.config.js`. It uses the `jest-expo` preset to handle Expo-specific modules and React Native transformations.

## Project Structure & Style

### Architecture
The project follows a modular structure:
- `src/components`: Reusable UI components (React Native Paper).
- `src/localization`: i18n-js setup for French and English.
- `src/screens`: Main application screens.
- `src/utils`: Business logic and helpers (e.g., score calculations).
- `src/types.ts`: Centralized TypeScript definitions.

### Code Style
- Use **TypeScript** for all new code.
- Follow existing patterns for functional components and hooks.
- Prefer **React Native Paper** components for UI consistency.
- Keep business logic (especially score calculations) in `src/utils` and cover them with unit tests.

### Internationalization
All user-facing strings should be added to `src/localization/i18n.ts` to support both French and English. Use the `i18n.t()` function for translations.
