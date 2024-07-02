import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function PaginationLinks({meta, onPageClick}) {

    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link)
    }
  return (
    <div className="flex items-center mt-5 justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={ev => onClick(ev, meta.links[0])}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
        {meta.total > meta.per_page &&
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            
            {meta.links && meta.links.map((link, ind) => (
                <a
                    key={ind}
                    href="#"
                    onClick={ev => onClick(ev, link)}
                    aria-current="page"
                    className={
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20  " + 
                        (ind === 0 ? 'rounded-l-md hover:bg-gray-50' : '') +  // Adds 'rounded-l-md' if ind equals 0
                        (ind === meta.links.length - 1 ? 'rounded-r-md hover:bg-gray-50' : '') +  // Adds 'rounded-r-md' if ind equals the last index
                        (link.active ? 'bg-indigo-600 px-4 py-2 text-sm font-semibold text-white border border-indigo-300' : '')  // Adds these classes if link.active is true
                    }
                    
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
            
          </nav>
        }
        </div>
      </div>
    </div>
  )
}
