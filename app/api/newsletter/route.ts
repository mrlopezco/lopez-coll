import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

// MIGRATED: Removed export const dynamic = 'force-static' (incompatible with Cache Components)
// Decision: Keep dynamic (no "use cache") - API route handles POST requests and should remain dynamic

const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata.newsletter.provider,
})

export { handler as GET, handler as POST }
