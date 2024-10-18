'use client'

import React from 'react'
import Typed from 'typed.js'

import Twemoji from '@/components/Twemoji'

const TypedBios = () => {
  const el = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    })
    return () => typed.destroy()
  }, [])

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          Dynamics 365 Finance{' '}
          <span className="ml-1">
            <Twemoji emoji="money-bag" /> <Twemoji emoji="bar-chart" />
          </span>
        </li>
        <li>
          Dynamics 365 Supply Chain Management{' '}
          <span className="ml-1">
            <Twemoji emoji="package" /> <Twemoji emoji="delivery-truck" />
          </span>
        </li>
        <li>
          Dynamics 365 Field Service{' '}
          <span className="ml-1">
            <Twemoji emoji="wrench" /> <Twemoji emoji="hammer-and-wrench" />
          </span>
        </li>
        <li>
          Dynamics 365 Retail{' '}
          <span className="ml-1">
            <Twemoji emoji="shopping-bags" /> <Twemoji emoji="credit-card" />
          </span>
        </li>
        <li>
          Dynamics 365 Project Management & Accounting{' '}
          <span className="ml-1">
            <Twemoji emoji="calendar" /> <Twemoji emoji="memo" />
          </span>
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export default TypedBios
