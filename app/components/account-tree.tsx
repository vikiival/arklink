const links = [
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

export default function AccountTree() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 px-4">
      {links.map(link => (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="card bg-base-100 border border-base-200 hover:border-primary/60 hover:shadow-lg transition-transform hover:-translate-y-0.5"
        >
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
        </a>
      ))}
    </div>
  )
}
