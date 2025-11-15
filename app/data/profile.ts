import { type ProfileHeader, type SocialLink } from '@/lib/types'

export const defaultProfileHeader: ProfileHeader = {
  name: 'Viki Val',
  bio: 'Curating onchain presence across the web. Tap into builds, experiments, and social channels — all anchored to Polkadot.',
  avatar: 'https://github.com/vikiival.png',
}

export const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    handle: '@vikiival',
    href: 'https://github.com/vikiival',
  },
  {
    platform: 'X (Twitter)',
    handle: '@vikiival',
    href: 'https://x.com/vikiival',
  },
  {
    platform: 'LinkedIn',
    handle: 'vikival',
    href: 'https://www.linkedin.com/in/vikival/',
  },
  {
    platform: 'Instagram',
    handle: '@imrkva',
    href: 'https://www.instagram.com/imrkva/',
  },
]
