// JavaScript
const webdav = require('webdav-server').v2;

// User manager (tells who are the users)
const userManager = new webdav.SimpleUserManager();
const user = userManager.addUser('username', 'password', false);

// Privilege manager (tells which users can access which files/folders)
const privilegeManager = new webdav.SimplePathPrivilegeManager();
privilegeManager.setRights(user, '/', ['all']);

const server = new webdav.WebDAVServer({
  // HTTP Digest authentication with the realm 'Default realm'
  httpAuthentication: new webdav.HTTPBasicAuthentication(userManager, 'Default realm'),
  privilegeManager: privilegeManager,
  port: 1900, // Load the server on the port 1900 (if not specified, default is 1900)
  autoSave: { // Will automatically save the changes in the 'data.json' file
    treeFilePath: 'data.json'
  }
});

server.beforeRequest((ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.setHeader('DAV', '1,2');
    ctx.response.setHeader('Access-Control-Allow-Origin', '*');
    ctx.response.setHeader('Access-Control-Allow-Credentials', 'true');
    ctx.response.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Depth, Content-Type',
    );
    ctx.response.setHeader(
      'Access-Control-Allow-Methods',
      'PROPPATCH,PROPFIND,OPTIONS,DELETE,UNLOCK,COPY,LOCK,MOVE,HEAD,POST,PUT,GET,MKCOL',
    );
    ctx.response.setHeader(
      'Access-Control-Expose-Headers',
      'DAV, Content-Length, Allow',
    );
    ctx.response.setHeader('MS-Author-Via', 'DAV');
    ctx.setCode(200);
    ctx.exit();
  } else {
    next();
  }
});

server.setFileSystem('/articles', new webdav.PhysicalFileSystem('/root/articles'), (success) => {
  server.start(() => console.log('READY'));
})
