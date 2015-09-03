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

  it('should call Track event on login', () => {
    Intercom.trackEvent();
    expect(mockIntercom).to.have.been.calledWith('trackEvent');
  });

});
