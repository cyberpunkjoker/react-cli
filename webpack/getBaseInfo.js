const packageName = require('../package.json').name;
const profile_name = process.env.profile_name;
const isDev =  process.env.NODE_ENV === 'development';
const CDNPath = isDev ? '/' : '//' + 'static-cdjr.jd.com' + `/${packageName}/`;

module.exports = {
  packageName,
  profile_name,
  isDev,
  CDNPath
}
