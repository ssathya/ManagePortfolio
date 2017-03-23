var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var csv = require('csvtojson');
var Firm = require('../models/firm');
var _ = require('underscore');


function saveFirm(csvObj, next) {
    var ipoYear = 0;
    if (csvObj.IPOyear !== 'n/a') {
        ipoYear = Number(csvObj.IPOyear);
    }
    var sector = '';
    if (csvObj.Sector !== 'n/a') {
        sector = _.unescape(csvObj.Sector);
    }
    var inustry = '';
    if (csvObj.industry != 'n/a') {
        industry = _.unescape(csvObj.industry);
    }
    var name = _.unescape(csvObj.Name);
    const regex = /&#39;/g;
    const subst = `'`;
    name = name.replace(regex, subst);
    if (csvObj.Name !== name) {
        console.log(csvObj.Name + " was changed to " + name);
    }
    var firm = {};
    firm.Symbol = _.unescape(csvObj.Symbol);
    firm.Name= name;
    firm.IPOyear= ipoYear;
    firm.Sector=sector;
    firm.Industry=industry;
    // var firm = new Firm({
    //     Symbol: _.unescape(csvObj.Symbol),
    //     Name: name,
    //     IPOyear: ipoYear,
    //     Sector: sector,
    //     Industry: industry
    // });
    var query = { "Symbol": firm.Symbol };
    Firm.findOneAndUpdate(query, firm, { upsert: true }, function (err, doc) {
        if (err) { next(err); }
    })
}
exports.firmMaintainGet = function (req, res, next) {
    var usrName = utils.getUserName(req);
    res.render('firmMaintainForm', { title: 'Firm maintain', user: usrName });
};
exports.firmMaintainPost = function (req, res, next) {
    if (!req.file) {
        return res.redirect('/');
        //console.log(req.file.path);
    }
    var csvFilePath = req.file.path;
    csv()
        .fromFile(csvFilePath)
        .on('json', (jsonObj) => {
            saveFirm(jsonObj, next);
        })
        .on('done', (error) => {
            if (error) {
                next(error);
            }
            console.log('database updated');
        });

    return res.redirect('/');
}