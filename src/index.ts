import { Slot, WebCtx } from 'qoq';
import jwt from 'koa-jwt';

export interface JWTOptions<
  TK extends string | undefined,
  K extends string | undefined,
  P extends boolean | undefined
> extends jwt.Options {
  tokenKey?: TK;
  key?: K;
  passthrough?: P;
  unless?: {
    custom?: (ctx: WebCtx) => boolean;
    path?: string | RegExp | (string | RegExp)[];
    ext?: string | string[];
    method?: string | string[];
  }
}

export class JWT<
  TK extends string | undefined = undefined,
  K extends string | undefined = 'user',
  P extends boolean | undefined = false
> extends Slot<Slot.Web, {}, (
  (P extends true ? { jwtOriginalError: Error | undefined } : {}) &
  (TK extends undefined
    ? {}
    : { [key in NonNullable<TK>]: string | (P extends true ? undefined : never); }
  ) &
  (K extends undefined
    ? {}
    : { [key in NonNullable<K>]: string | (P extends true ? undefined : never); }
  )
)> {
  constructor(options: JWTOptions<TK, K, P>) {
    super();
    const { unless, ...rest } = options;
    const instance = jwt(rest);

    this.use(unless ? instance.unless(unless) : instance);
  }
}
