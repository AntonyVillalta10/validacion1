'use strict';

function ConvertHandler() {

  const conversionRates = {
    galToL: 3.78541,
    lbsToKg: 0.453592,
    miToKm: 1.60934
  };

  this.getNum = function (input) {
    let unitStart = input.length;
    for (let i = 0; i < input.length; i++) {
      if (/[a-zA-Z]/.test(input[i])) {
        unitStart = i;
        break;
      }
    }

    const numStr = input.substring(0, unitStart);

    if (!numStr) return 1;

    if (!/^[0-9.\/]+$/.test(numStr)) return 'invalid number';

    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return numerator / denominator;
        }
      }
      return 'invalid number';
    }

    const num = parseFloat(numStr);
    if (isNaN(num)) return 'invalid number';

    if (numStr.includes('.') && numStr.split('.').length > 2) {
      return 'invalid number';
    }

    return num;
  };

  this.getUnit = function (input) {
    let unitStart = input.length;
    for (let i = 0; i < input.length; i++) {
      if (/[a-zA-Z]/.test(input[i])) {
        unitStart = i;
        break;
      }
    }

    const unit = input.substring(unitStart);
    if (!unit) return 'invalid unit';
    if (!/^[a-zA-Z]+$/.test(unit)) return 'invalid unit';

    const unitLower = unit.toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

    if (validUnits.includes(unitLower)) {
      return unitLower === 'l' ? 'L' : unitLower;
    }

    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    const unitLower = unit.toLowerCase();
    const unitNames = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    return unitNames[unitLower] || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    if (typeof initNum !== 'number' || isNaN(initNum)) return 'invalid number';
    if (typeof initUnit !== 'string') return 'invalid unit';

    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * conversionRates.galToL;
        break;
      case 'l':
        result = initNum / conversionRates.galToL;
        break;
      case 'lbs':
        result = initNum * conversionRates.lbsToKg;
        break;
      case 'kg':
        result = initNum / conversionRates.lbsToKg;
        break;
      case 'mi':
        result = initNum * conversionRates.miToKm;
        break;
      case 'km':
        result = initNum / conversionRates.miToKm;
        break;
      default:
        return 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${parseFloat(returnNum.toFixed(5))} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
