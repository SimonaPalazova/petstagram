const { getErrorMessage } = require('../untils/errorHelpers');

exports.errorHandler = (err, req, res) => {
    res.render('/404', {error: getErrorMessage(err)});
};