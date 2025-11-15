'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { defaultSocialLinks } from '../data/profile'
import type { SocialLink } from '@/lib/types'

type WebLink = {
  platform: string
  handle: string
  href: string
  icon: string
  accent: string
  isInternal?: boolean
}

type PlatformStyle = {
  label: string
  icon: string
  accent: string
}

type AccountTreeProps = {
  socialLinks: SocialLink[]
  fallbackNotice?: string
}

const web3Links: WebLink[] = [
  {
    platform: 'Buy me a crypto coffee',
    handle: 'Nova Wallet',
    href: 'https://novawallet.io',
    icon: 'icon-[mdi--currency-usd]',
    accent: 'bg-emerald-600 text-white',
  },
  {
    platform: 'Mint Meet Memo',
    handle: 'Claim a POAP',
    href: '/memo',
    icon: 'icon-[mdi--account-group]',
    accent: 'bg-purple-600 text-white',
    isInternal: true,
  },
]

const platformStyles: Record<string, PlatformStyle> = {
  twitter: {
    label: 'X (Twitter)',
    icon: 'icon-[mdi--twitter]',
    accent: 'bg-slate-900 text-white',
  },
  x: {
    label: 'X (Twitter)',
    icon: 'icon-[mdi--twitter]',
    accent: 'bg-slate-900 text-white',
  },
  telegram: {
    label: 'Telegram',
    icon: 'icon-[mdi--telegram]',
    accent: 'bg-sky-500 text-white',
  },
  github: {
    label: 'GitHub',
    icon: 'icon-[mdi--github]',
    accent: 'bg-neutral text-white',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'icon-[mdi--linkedin]',
    accent: 'bg-sky-700 text-white',
  },
  instagram: {
    label: 'Instagram',
    icon: 'icon-[mdi--instagram]',
    accent: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white',
  },
}

const fallbackStyle: PlatformStyle = {
  label: 'Profile Link',
  icon: 'icon-[mdi--link-variant]',
  accent: 'bg-base-300 text-base-content',
}

type Tab = 'socials' | 'web3'

export default function AccountTree({ socialLinks, fallbackNotice }: AccountTreeProps) {
  const [activeTab, setActiveTab] = useState<Tab>('socials')

  const mappedSocialLinks = useMemo(() => {
    const source = socialLinks.length ? socialLinks : defaultSocialLinks
    return source.map(mapSocialLink)
  }, [socialLinks])

  const links = activeTab === 'socials' ? mappedSocialLinks : web3Links

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 px-4">
      <div role="tablist" className="tabs tabs-boxed w-full bg-base-100 border border-base-200 rounded-box p-1 shadow-sm">
        <button
          type="button"
          role="tab"
          className={`tab tab-lg flex-1 transition-all ${activeTab === 'socials' ? 'tab-active !bg-primary text-primary-content shadow-md' : 'text-base-content/70 hover:text-base-content'}`}
          onClick={() => setActiveTab('socials')}
        >
          Socials
        </button>
        <button
          type="button"
          role="tab"
          className={`tab tab-lg flex-1 transition-all ${activeTab === 'web3' ? 'tab-active !bg-primary text-primary-content shadow-md' : 'text-base-content/70 hover:text-base-content'}`}
          onClick={() => setActiveTab('web3')}
        >
          Web3
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {links.map(link => {
          const content = (
            <div className="card-body py-4 px-5 flex-row items-center gap-4">
              <div className={`avatar placeholder ${link.accent} rounded-full p-3`}>
                <span className={`${link.icon} text-2xl`} />
              </div>
              <div>
                <p className="text-sm text-base-content/60">{link.platform}</p>
                <p className="text-xl font-semibold">{link.handle}</p>
              </div>
              <span className="ms-auto icon-[mdi--arrow-top-right-bold-box-outline] text-2xl text-base-content/50" />
            </div>
          )

          if (link.isInternal) {
            return (
              <Link
                key={`${link.platform}-${link.handle}`}
                href={link.href}
                className="card bg-base-100 border border-base-200 hover:border-primary/60 hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {content}
              </Link>
            )
          }

          return (
            <a
              key={`${link.platform}-${link.handle}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-base-100 border border-base-200 hover:border-primary/60 hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {content}
            </a>
          )
        })}
      </div>

      {activeTab === 'socials' && fallbackNotice ? (
        <div className="alert alert-warning bg-warning/20 border-warning/50 text-sm">
          <span className="icon-[mdi--alert-outline] text-lg" />
          <span>{fallbackNotice}</span>
        </div>
      ) : null}
    </div>
  )
}

function mapSocialLink(entry: SocialLink): WebLink {
  const platformKey = entry.platform?.toLowerCase().trim()
  const style = (platformKey && platformStyles[platformKey]) || fallbackStyle

  return {
    platform: style.label ?? capitalize(entry.platform ?? 'Link'),
    handle: entry.handle,
    href: entry.href,
    icon: style.icon,
    accent: style.accent,
  }
}

function capitalize(value: string) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}
