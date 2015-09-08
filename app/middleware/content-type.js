export default function (req, res, next) {
  res.contentType('application/vnd.api+json; charset=utf-8');
  next();
};
