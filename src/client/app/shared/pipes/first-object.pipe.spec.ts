import { FirstObjectPipe } from './first-object.pipe';

describe('FirstObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
