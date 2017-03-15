const Matchex = require('../');
const after = require('lodash.after');
const expect = require('chai').expect;

describe('Test functionality of matchex', () => {
  let matchex;

  beforeEach(() => {
    matchex = new Matchex();
  });

  it('Should match a simple pattern', done => {
    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
      done();
    });
    matchex.run('This is a test');
  });

  it('Should all for duplicate patterns to match', done => {
    const allDone = after(2, done);

    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
      allDone();
    });

    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
      allDone();
    });

    matchex.run('This is a test');
  });

  it('Should match multiple groups', done => {
    matchex.use('(.*) is (.*) (.*)', (all, first, second, third) => {
      expect(all).to.equal('This is a test');
      expect(first).to.equal('This');
      expect(second).to.equal('a');
      expect(third).to.equal('test');
      done();
    });

    matchex.run('This is a test');
  });

  it('Should be able to be make matches case insensitive', done => {
    const allDone = after(4, done);

    matchex.use('THIS IS A (.*)', (all, word) => {
      expect(word).to.equal('test');
      allDone();
    }, { caseInsentive: true });

    matchex.use('This is a (.*)', (all, word) => {
      expect(word).to.equal('test');
      allDone();
    }, { caseInsentive: true });

    matchex.run('This is a test');
    matchex.run('THIS IS A test');
  });

  it('Should work with a regex literal', done => {
    matchex.use(/Testing testing (.*)\s(.*)\s(.*)/, (all, first, second, third) => {
      expect(first).to.equal('1');
      expect(second).to.equal('2');
      expect(third).to.equal('3');
      done();
    });
    matchex.run('Testing testing 1 2 3');
  });

});
