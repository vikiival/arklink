import AccountTree from './components/account-tree'
import Footer from './components/footer'
import Header from './components/header'
import ProfileHero from './components/profile-hero'
import { defaultProfileHeader, defaultSocialLinks } from './data/profile'
import type { ProfileHeader, SocialLink } from '@/lib/types'

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

type ProfileApiResponse = {
  data?: {
    socials?: Array<Partial<SocialLink>>
    header?: Partial<ProfileHeader>
  }
}

type ProfileResult = {
  socials: SocialLink[]
  header: ProfileHeader
  fallbackNotice?: string
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedHandle = resolveHandle(await searchParams)
  const { socials, header, fallbackNotice } = await fetchProfile(resolvedHandle)

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 gap-10">
        <ProfileHero
          badge="Secured by Arkiv & Polkadot"
          name={header.name}
          description={header.bio}
          avatarUrl={header.avatar}
        />

        <AccountTree socialLinks={socials} fallbackNotice={fallbackNotice} />
      </main>

      <Footer />
    </div>
  )
}

function resolveHandle(searchParams?: Record<string, string | string[] | undefined>) {
  if (!searchParams) return 'vikiival'

  const param = searchParams.u
  if (Array.isArray(param)) {
    const first = param.find(Boolean)
    return first && first.trim().length > 0 ? first.trim() : 'vikiival'
  }

  return param && param.trim().length > 0 ? param.trim() : 'vikiival'
}

async function fetchProfile(handle: string): Promise<ProfileResult> {
  const fallbackResult: ProfileResult = {
    socials: defaultSocialLinks,
    header: defaultProfileHeader,
    fallbackNotice: `No profile data found for @${handle}. Showing preset stack.`,
  }

  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/u/${encodeURIComponent(handle)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile payload')
    }

    const payload: ProfileApiResponse = await response.json()
    const socials = sanitizeSocials(payload.data?.socials)
    const header = hydrateHeader(payload.data?.header)

    if (!socials.length) {
      return { socials: defaultSocialLinks, header, fallbackNotice: fallbackResult.fallbackNotice }
    }

    return { socials, header }
  } catch {
    return fallbackResult
  }
}

function sanitizeSocials(entries?: Array<Partial<SocialLink>>): SocialLink[] {
  if (!Array.isArray(entries)) return []
  return entries
    .filter(entry => Boolean(entry?.href))
    .map(entry => ({
      platform: entry?.platform?.trim().length ? entry.platform! : 'Profile Link',
      handle: entry?.handle ?? '',
      href: entry!.href!,
    }))
}

function hydrateHeader(header?: Partial<ProfileHeader>): ProfileHeader {
  return {
    name: header?.name?.trim().length ? header.name : defaultProfileHeader.name,
    bio: header?.bio?.trim().length ? header.bio : defaultProfileHeader.bio,
    avatar: header?.avatar?.trim().length ? header.avatar : defaultProfileHeader.avatar,
  }
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://127.0.0.1:3000'
}
