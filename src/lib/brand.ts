/**
 * Single-point brand identity (ROADMAP Part II §15). When the owner picks the
 * final trademark-cleared name, changing these constants (plus the static
 * manifest and README) renames the product everywhere. A CI grep gate keeps
 * stray hardcoded uses out of the tree.
 */
export const BRAND = "OpenSolids";
export const BRAND_TAGLINE = "free, science-based baby solids guide";
/**
 * Where people can reach a human. Deliberately the same mailbox the app sends
 * transactional mail from (EMAIL_FROM), so a parent who simply hits reply on a
 * verification or password-reset email lands somewhere a person reads.
 */
export const SUPPORT_EMAIL = "hello@opensolids.org";
