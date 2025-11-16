import Footer from '../components/footer'
import Header from '../components/header'
import ProfileHero from '../components/profile-hero'
import type { Memo as MemoPayload } from '@/lib/types'

const MEMO_CODE = 'vikiba'

const FALLBACK_MEMO: MemoPayload = {
  id: 'fallback',
  chain: 'Polkadot',
  collection: 'DotMemo',
  name: 'Meet Memo',
  description: 'Lock in your presence from the Mint Meet session. This POAP verifies that you joined the gathering, synced wallets, and co-created the decentralized Linktree prototype.',
  image: '/memo-badge.svg',
  mint: 'QmMemoFallback',
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
}

export default async function MemoPage() {
  const memo = await fetchMemo()
  const activeMemo = memo ?? FALLBACK_MEMO
  const stats = buildStats(activeMemo)
  const avatarUrl = activeMemo.image ?? FALLBACK_MEMO.image
  const shouldUnoptimize = avatarUrl?.startsWith('http')
  const notice = memo ? null : 'Unable to load the live DotMemo drop. Showing reference content instead.'

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 gap-10">
        <ProfileHero
          badge="Onchain Memory Drop"
          badgeTone="secondary"
          name={activeMemo.name}
          description={activeMemo.description}
          avatarSize={208}
          avatarUrl={avatarUrl}
          unoptimizedAvatar={shouldUnoptimize}
        />

        <div className="w-full max-w-2xl flex flex-col gap-6 px-4">
          {notice ? (
            <div className="alert alert-warning bg-warning/15 border-warning/40 text-sm">
              <span className="icon-[mdi--alert-outline] text-lg" />
              <span>{notice}</span>
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="card bg-base-100 border border-base-200 hover:border-primary/60 transition-colors"
              >
                <div className="card-body flex-row items-center gap-4 py-4 px-5">
                  <div className="avatar placeholder bg-base-300 text-base-content rounded-full p-3">
                    <span className={`${stat.icon} text-2xl`} />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-xl font-semibold break-words">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn border-none text-white text-lg font-semibold shadow-xl w-full hover:brightness-95"
            style={{ backgroundColor: '#31ce75' }}
          >
            Claim {activeMemo.name}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return 'https://arkl.vercel.app' //process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return 'https://arkl.vercel.app' // `https://${process.env.VERCEL_URL}`
  }

  return 'http://127.0.0.1:3000'
}


async function fetchMemo(): Promise<MemoPayload | null> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/memo?code=${MEMO_CODE}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch memo')
    }

    return (await response.json()) as MemoPayload
  } catch (error) {
    console.error('Failed to load memo data', error)
    return null
  }
}

function buildStats(memo: MemoPayload) {
  return [
    {
      label: 'Chain',
      value: formatChain(memo.chain),
      icon: 'icon-[mdi--vector-link]',
    },
    {
      label: 'Collection',
      value: memo.collection ?? 'TBA',
      icon: 'icon-[mdi--account-group]',
    },
    {
      label: 'Supply',
      value: formatMaxSupply(50),
      icon: 'icon-[mdi--cube-scan]',
    },
    {
      label: 'Claim window',
      value: formatTimeRemaining(memo.expiresAt),
      icon: 'icon-[mdi--clock-fast]',
    },
  ]
}

function formatTimeRemaining(expiresAt?: string) {
  if (!expiresAt) return 'TBA'
  const expires = new Date(expiresAt).getTime()
  if (Number.isNaN(expires)) return 'TBA'
  const diff = expires - Date.now()
  if (diff <= 0) return 'Expired'
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  if (days > 0) {
    return `${days}d ${hours}h left`
  }
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  return `${hours}h ${minutes}m left`
}

function formatChain(chain?: string) {
  if (!chain) return 'TBA'
  return chain.toLowerCase() === 'ahp' ? 'Polkadot' : 'Kusama'
}

function formatMaxSupply(max?: number) {
  if (typeof max === 'number' && max > 0) {
    return `${max.toLocaleString()} total`
  }
  return 'Limited run'
}
