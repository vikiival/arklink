import Image from 'next/image'

import { defaultProfileHeader } from '../data/profile'

type BadgeTone = 'primary' | 'secondary'

const badgeToneMap: Record<BadgeTone, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
}

type ProfileHeroProps = {
  badge: string
  name: string
  description: string
  avatarSize?: number
  badgeTone?: BadgeTone
  avatarUrl?: string
}

export default function ProfileHero({
  badge,
  name,
  description,
  avatarSize = 128,
  badgeTone = 'primary',
  avatarUrl,
}: ProfileHeroProps) {
  const resolvedAvatar = avatarUrl ?? defaultProfileHeader.avatar

  return (
    <div className="flex flex-col items-center text-center px-4 gap-6">
      <div className="avatar">
        <div
          className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl overflow-hidden"
          style={{ width: avatarSize, height: avatarSize }}
        >
          <Image
            src={resolvedAvatar}
            alt={name}
            width={avatarSize}
            height={avatarSize}
            priority
          />
        </div>
      </div>
      <div className="space-y-2 max-w-2xl">
        <p className={`badge badge-outline uppercase tracking-widest ${badgeToneMap[badgeTone]}`}>
          {badge}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-base-content">{name}</h1>
        <p className="text-base-content/70 text-lg max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  )
}
