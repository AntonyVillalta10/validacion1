'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;

      if (!input) {
        return res.send('invalid input');
      }

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      // 🔹 Ambos inválidos
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.send('invalid number and unit');
      }

      // 🔹 Número inválido
      if (initNum === 'invalid number') {
        return res.send('invalid number');
      }

      // 🔹 Unidad inválida
      if (initUnit === 'invalid unit') {
        return res.send('invalid unit');
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      });
    });
};
