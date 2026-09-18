import Link from 'next/link'

const Nav = ({ name }: {name: string}) => {
  return (
    <nav className='text-muted-foreground cursor-pointer hover:text-gray-100 duration-200' aria-label="Breadcrumb">
      <Link className='flex justify-start items-center gap-0.5' href={`/${name.replace('s', '').toLowerCase()}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon mt-0.5"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l4 4" />
          <path d="M5 12l4 -4" />
        </svg>{" "}
        <span>Back to {name}</span>
      </Link>
    </nav>
  )
}

export default Nav
