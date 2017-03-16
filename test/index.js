const Matchex = require('../');
const after = require('lodash.after');
const expect = require('chai').expect;

describe('Test functionality of matchex', () => {
  let matchex;

  beforeEach(() => {
    matchex = new Matchex();
  });

  it('Should match a simple pattern', () => {
    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
    });
    matchex.run('This is a test');
  });

  it('Should all for duplicate patterns to match', () => {
    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
    });

    matchex.use('This is a (.*)', (all, word) => {
      expect(all).to.equal('This is a test');
      expect(word).to.equal('test');
    });

    matchex.run('This is a test');
  });

  it('Should match multiple groups', () => {
    matchex.use('(.*) is (.*) (.*)', (all, first, second, third) => {
      expect(all).to.equal('This is a test');
      expect(first).to.equal('This');
      expect(second).to.equal('a');
      expect(third).to.equal('test');
    });

    matchex.run('This is a test');
  });

  it('Should be able to be make matches case insensitive', () => {
    matchex.use('THIS IS A (.*)', (all, word) => {
      expect(word).to.equal('test');
    }, { caseInsentive: true });

    matchex.use('This is a (.*)', (all, word) => {
      expect(word).to.equal('test');
    }, { caseInsentive: true });

    matchex.run('This is a test');
    matchex.run('THIS IS A test');
  });

  it('Should work with a regex literal', () => {
    matchex.use(/Testing testing (.*)\s(.*)\s(.*)/, (all, first, second, third) => {
      expect(first).to.equal('1');
      expect(second).to.equal('2');
      expect(third).to.equal('3');
    });
    matchex.run('Testing testing 1 2 3');
  });

  it('Should throw an error if passed something other than a string or RegExp', () => {
    expect(() => matchex.use(1, function() {})).to.throw(Error);
  });
});
