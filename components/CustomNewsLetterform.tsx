'use client'
import { useRef, useState, FormEvent } from 'react'

interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const CustomNewsletterForm: React.FC<NewsletterFormProps> = ({
  title = 'Subscribe to the newsletter',
  apiUrl = '/api/newsletter',
}) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch(apiUrl, {
      body: JSON.stringify({
        email: inputEl.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await res.json()
    if (result.error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }
    if (inputEl.current) {
      inputEl.current.value = ''
    }
    setError(false)
    setSubscribed(true)
  }

  return (
    <form className="mc-embedded-subscribe-form relative space-y-3 text-xs" onSubmit={subscribe}>
      <div className="mc-email-input group flex items-center space-x-4">
        <div className="relative w-2/3">
          <input
            type="email"
            name="EMAIL"
            className="subscribe-email dark:border-b-white-300 w-full border-b-2 border-b-gray-300 py-2 text-lg text-xs text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 dark:bg-dark dark:text-white"
            id="mce_email_2227"
            placeholder={subscribed ? "You're subscribed! 🎉" : 'Enter your email'}
            ref={inputEl}
            required
            disabled={subscribed}
            style={{ borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
          />
          <span className="block h-0.5 max-w-0 bg-primary-500 transition-all duration-500 group-focus-within:max-w-full dark:bg-primary-500"></span>
          <label htmlFor="mce_email_2227" className="sr-only" data-content="Enter your email">
            Enter your email
          </label>
        </div>

        <button
          type="submit"
          className="mailchimp-subscribe btn primary w-1/3 rounded-full bg-gray-200 p-2 text-gray-900 transition-all duration-300 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          disabled={subscribed}
        >
          Subscribe
        </button>
      </div>

      {error && <small className="ml-2 text-red-500">{message}</small>}
    </form>
  )
}

export default CustomNewsletterForm
