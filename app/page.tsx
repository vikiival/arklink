import Image from 'next/image'

import AccountTree from './components/account-tree'
import Footer from './components/footer'
import Header from './components/header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 gap-10">
        <div className="flex flex-col items-center text-center px-4 gap-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl overflow-hidden">
              <Image
                src="https://github.com/vikiival.png"
                alt="Viki Val"
                width={128}
                height={128}
                priority
              />
            </div>
          </div>
          <div className="space-y-2 max-w-2xl">
            <p className="badge badge-outline badge-primary uppercase tracking-widest">Decentralized Linktree POC</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-base-content">Viki Val</h1>
            <p className="text-base-content/70 text-lg max-w-xl">
              Curating onchain presence across the web. Tap into builds, experiments, and social channels —
              all anchored to Polkadot.
            </p>
          </div>
        </div>

        <AccountTree />
      </main>

      <Footer />
    </div>
  )
}
