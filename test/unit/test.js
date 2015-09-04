import Intercom, { setDocument, setIntercomFunction } from '../../src/index';

let mockIntercom;

describe('Intercom tests', () => {
  beforeEach(() => {
    mockIntercom = sinon.spy();
    setIntercomFunction(mockIntercom);
  });

  it('should call Intercom on page change', () => {
    Intercom.update();
    expect(mockIntercom).to.have.been.calledWith('update');
  });

  it('should call Intercom on login', () => {
    Intercom.boot();
    expect(mockIntercom).to.have.been.calledWith('boot');
  });

  it('should call Intercom on shutdown', () => {
    Intercom.shutdown();
    expect(mockIntercom).to.have.been.calledWith('shutdown');
  });

  it('should call Track event on login', () => {
    Intercom.trackEvent();
    expect(mockIntercom).to.have.been.calledWith('trackEvent');
  });

  it('should not call Track event when more than 5 properties are passed in context', () => {
    Intercom.trackEvent('example', {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    });
    expect(mockIntercom).to.have.not.been.called;
  });

});
