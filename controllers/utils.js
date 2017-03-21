exports.cleanUserInput = function(req, element){
    req.sanitize(element).escape();
    req.sanitize(element).trim();
    return req.body[element];
}