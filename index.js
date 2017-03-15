const Matchex = function() {
  this.matchers = new Map();
};

Matchex.prototype.use = function(pattern, cb, options = { caseInsentive: false }) {
  const regex = new RegExp(pattern, options.caseInsentive ? 'i' : '');
  if (this.matchers.has(regex)) {
    this.matchers.get(regex).push(cb);
  }
  this.matchers.set(regex, [cb]);
  return this.matchers.get(regex);
};

Matchex.prototype.run = function(text) {
  for (let [regex, cbs] of this.matchers.entries()) {
    const match  = text.match(regex);
    if (match) {
      cbs.forEach(cb => {
        cb.apply(null, match);
      });
    }
  }
};

module.exports = Matchex;
