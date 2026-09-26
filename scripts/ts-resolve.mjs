/**
 * Lets the check scripts import the app's TypeScript modules directly.
 *
 * The app is written for a bundler, so relative imports omit their extension.
 * Node's ESM resolver requires one, so this hook retries extensionless
 * relative specifiers as `.ts`. Node strips the types itself.
 */
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, next) {
    const relative = specifier.startsWith('./') || specifier.startsWith('../');
    if (relative && !/\.[a-zA-Z0-9]+$/.test(specifier)) {
      try {
        return next(`${specifier}.ts`, context);
      } catch {
        /* fall through to the original specifier */
      }
    }
    return next(specifier, context);
  },
});
