import Image from 'next/image'
import Twemoji from '../Twemoji'

const ShortDescription = () => {
  return (
    <div className="mb-6 mt-4">
      <p>
        Large international project experience including European, North, and South American
        countries
      </p>
      <p>
        Strengths include strong listening skills, comprehension of complex issues, customer issue
        resolution, and fulfillment of customer’s business requirements.
      </p>
      <div>
        <p>
          <span>
            <Twemoji className="mr-2" emoji="man-technologist" />
          </span>
          In my spare time I do fun projects like:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <a
              href="https://plaza-365.com"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-500 hover:dark:text-primary-400"
            >
              Plaza 365
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ShortDescription
