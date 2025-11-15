'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type WebLink = {
  platform: string
  handle: string
  href: string
  icon: string
  accent: string
  isInternal?: boolean
}

const socialLinks: WebLink[] = [
  {
    platform: 'GitHub',
    handle: '@vikiival',
    href: 'https://github.com/vikiival',
    icon: 'icon-[mdi--github]',
    accent: 'bg-neutral text-white',
  },
  {
    platform: 'X (Twitter)',
    handle: '@vikiival',
    href: 'https://x.com/vikiival',
    icon: 'icon-[mdi--twitter]',
    accent: 'bg-slate-900 text-white',
  },
  {
    platform: 'LinkedIn',
    handle: 'vikival',
    href: 'https://www.linkedin.com/in/vikival/',
    icon: 'icon-[mdi--linkedin]',
    accent: 'bg-sky-700 text-white',
  },
  {
    platform: 'Instagram',
    handle: '@imrkva',
    href: 'https://www.instagram.com/imrkva/',
    icon: 'icon-[mdi--instagram]',
    accent: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white',
  },
]

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

type Tab = 'socials' | 'web3'

export default function AccountTree() {
  const [activeTab, setActiveTab] = useState<Tab>('socials')

  const links = useMemo<WebLink[]>(() => (activeTab === 'socials' ? socialLinks : web3Links), [activeTab])

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
                key={link.platform}
                href={link.href}
                className="card bg-base-100 border border-base-200 hover:border-primary/60 hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {content}
              </Link>
            )
          }

          return (
            <a
              key={link.platform}
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
    </div>
  )
}
