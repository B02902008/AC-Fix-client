export const TokenType = {
  plaintext: 1,
  timestamp: 2,
  logLevels: 3
};

export interface MatchingToken {
  regex: RegExp;
  type: number;
}
