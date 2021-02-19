# qoq-jwt
qoq middleware for validating JSON Web Tokens based on [koa-jwt](https://github.com/koajs/jwt).

[![License](https://img.shields.io/github/license/qoq-ts/qoq-jwt)](https://github.com/qoq-ts/qoq-jwt/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/qoq-jwt)](https://www.npmjs.com/package/qoq-jwt)

# Installation
```bash
yarn add qoq-jwt
```

# Usage
```typescript
import { WebSlotManager } from 'qoq';
import { JWT } from 'qoq-jwt';

export const webSlots = WebSlotManager.use(new JWT({ secret: 'shared-secret' }));
```
You can run the jwt slot under certain conditions:
```typescript
import { WebSlotManager, WebRouter } from 'qoq';
import { JWT } from 'qoq-jwt';

export const webSlots = WebSlotManager
  .use(new JWT({
    secret: 'shared-secret',
    unless: {
      path: [/^\/public/],
    }
  }));

const router = new WebRouter({
  prefix: '/',
  slots: webSlots,
});

router
  .get('/public')
  .action((ctx, next) => {
    ctx.send('unprotected\n');
  });

router
  .get('/api')
  .action((ctx, next) => {
    ctx.send('protected\n');
  });
```

# Options
@see [koa-jwt](https://github.com/koajs/jwt#koa-jwt)
