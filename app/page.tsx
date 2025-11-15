import AccountTree from './components/account-tree'
import Footer from './components/footer'
import Header from './components/header'
import ProfileHero from './components/profile-hero'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 gap-10">
        <ProfileHero
          badge="Decentralized Linktree POC"
          name="Viki Val"
          description="Curating onchain presence across the web. Tap into builds, experiments, and social channels — all anchored to Polkadot."
        />

        <AccountTree />
      </main>

      <Footer />
    </div>
  )
}
