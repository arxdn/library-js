---
'@arxdn/toast': minor
---

Add type-specific toast colors, Tailwind CSS support, SSR safety, and various fixes:

- Apply DEFAULT_THEME colors for all toast types (success, error, warning, info, default)
- Skip type class when custom className is provided (enables Tailwind override)
- Add XSS sanitization for icon option
- Add lazy initialization for SSR compatibility
- Preserve type class in update() method
- Use DOM check as primary guard in StyleManager
- Remove conflicting CSS transition from progress bar
- Clamp remainingTime to prevent negative values
- Re-sync auto-dismiss timer on update()
- Decouple className from default icon rendering
- Make getContainer() private (cleanup)
- Add CI quality gates workflow
- Update ESLint Prettier plugins
- Fix tsconfig extends path in shared package
- Correct UniqueId.create return type
