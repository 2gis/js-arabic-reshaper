const assert = require('chai').assert;
const reshape = require('../index.js').reshape;

function showCodes(str) { 
  const output = [];
  for (let c of str) {
    output.push(c, '('+c.charCodeAt(0).toString(16)+')');
  }
  return output.join(''); 
}

function failMsg (input, expected, output) {
  return 'input=' +showCodes(input) + '; output=' + showCodes(output) + '; expected=' + showCodes(expected);
}

describe('test Latin alphabet and numerals', () => {
  it('does not change Latin alphabet', () => {
    const input = 'apple';
    const output = reshape(input);
    assert.equal(output, input, failMsg(input, input, output));
  });
  it('does not change Latin numerals', () => {
    const input = '123';
    const output = reshape(input);
    assert.equal(output, input, failMsg(input, input, output));
  });
});

describe('tests Arabic words', () => {
  it('reshapes -apple-', () => {
    const input = 'تفاحة';
    const output = reshape(input);
    const expected = 'ﺗﻔﺎﺣﺔ';
    assert.equal(output, expected, failMsg(input, expected, output));
  });

  it('reshapes -Arabic alphabet-', () => {
    const input = 'الأبجدية';
    const output = reshape(input);
    const expected = 'ﺍﻷﲜﺪﻳﺔ';
    assert.equal(output, expected, failMsg(input, expected, output));
  });
  
  it('reshapes -Arabic alphabet- x 2', () => {
    assert.equal(reshape('الأبجدية الأبجدية'),
      'ﺍﻷﲜﺪﻳﺔ ﺍﻷﲜﺪﻳﺔ');
  });
  
  it('reshapes -Arabic alphabet- without ligatures', () => {
    assert.equal(reshape('الأبجدية', { ligatures: false }),
      'ﺍﻟﺄﺑﺠﺪﻳﺔ');
  });
});