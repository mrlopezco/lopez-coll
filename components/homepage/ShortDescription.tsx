import Image from 'next/image'
import Twemoji from '../Twemoji'

const ShortDescription = () => {
  return (
    <h2 className="mb-6 mt-4">
      <p>
        Not only do I love working with applications, but I also thrive in managing teams, ensuring
        projects are completed on time and within budget. My international experience spans
        European, North, and South American countries, always striving to achieve the best results
        for my clients.
      </p>
      {/* <p>
        My strengths include strong listening skills, the ability to comprehend complex issues,
        resolving customer issues, and fulfilling business requirements.
      </p> */}
      <p>
        In my spare time, I love to create projects that help others. Such as{' '}
        <a
          href="https://plaza-365.com"
          className="text-primary-600 hover:text-primary-500 dark:text-primary-500 hover:dark:text-primary-400"
        >
          Plaza 365
        </a>
        , where users can stay in touch with the newest articles of the Dynamics 365 space.
      </p>
    </h2>
  )
}

export default ShortDescription
