import Footer from '../components/footer'
import Header from '../components/header'
import ProfileHero from '../components/profile-hero'

const memoStats = [
  {
    label: 'Supply',
    value: '250 badges',
    icon: 'icon-[mdi--cube-scan]',
  },
  {
    label: 'Claim window',
    value: '24 hours left',
    icon: 'icon-[mdi--clock-fast]',
  },
  {
    label: 'Network',
    value: 'Polkadot',
    icon: 'icon-[mdi--vector-link]',
  },
  {
    label: 'Venue',
    value: 'Mint Meet 2024',
    icon: 'icon-[mdi--account-voice]',
  },
]

export default function MemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 gap-10">
        <ProfileHero
          badge="Onchain Memory Drop"
          badgeTone="secondary"
          name="Meet Memo"
          description="Lock in your presence from the Mint Meet session. This POAP verifies that you joined the gathering, synced wallets, and co-created the decentralized Linktree prototype."
          avatarSize={176}
        />

        <div className="w-full max-w-2xl flex flex-col gap-6 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {memoStats.map(stat => (
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
                    <p className="text-xl font-semibold">{stat.value}</p>
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
            Claim Meet Memo
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
