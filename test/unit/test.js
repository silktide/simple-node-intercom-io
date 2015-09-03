import Intercom, { setDocument, setIntercomFunction } from '../../src/index';

let mockIntercom;

describe('Intercom tests', () => {
  beforeEach(() => {
    mockIntercom = sinon.spy();
    setIntercomFunction(mockIntercom);
  });

  it('should call Intercom on page change', () => {
    Intercom.changePage();
    expect(mockIntercom).to.have.been.calledWith('update');
  });

  it('should call Intercom on login', () => {
    Intercom.logIn();
    expect(mockIntercom).to.have.been.calledWith('boot');
  });

});
