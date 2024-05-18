const { verify } = require("jsonwebtoken");
const User = require("../models/user");
const { isEmpty } = require("../util/helper");
const logger = require("../util/log");

const { JWTSECTRET, HTTP_STATUS_FORBIDDEN } = require("../util/const");

function throw403err(next) {
  const err = new Error("Forbidden");
  err.statusCode = HTTP_STATUS_FORBIDDEN;
  next(err);
}

function logDeniedAccess(err) {
  logger.warn(err.message, {
    errno: err.errno,
    error: err,
  });
}

module.exports = {
  isAuthorized(req, res, next) {
    if (isEmpty(res.isAuth) || !res.isAuth) {
      throw403err(next);
    }
    next();
  },

  async grantIfAdmin(req, res, next) {
    try {
      if (isEmpty(res.isAuth) || !res.isAuth) {
        const decodedJwt = verify(res.jwt, JWTSECTRET);

        let user = await User.findOne({
          where: { id: parseInt(decodedJwt.sub), isadmin: true },
        });

        if (!isEmpty(user)) {
          res.isAuth = true;
        }
      }
    } catch (err) {
      logDeniedAccess(err);
    } finally {
      next();
    }
  },

  grantIfRessourceOwner(req, res, next) {
    try {
      if (isEmpty(res.isAuth) || !res.isAuth) {
        verify(res.jwt, JWTSECTRET, {
          subject: req.params.userid,
        });
        res.isAuth = true;
      }
    } catch (err) {
      logDeniedAccess(err);
    } finally {
      next();
    }
  },
};
