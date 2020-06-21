import { RelativeDatePipe } from './relative-date.pipe';

describe('DateAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new RelativeDatePipe();
    expect(pipe).toBeTruthy();
  });
});
