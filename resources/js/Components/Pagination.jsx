import { Link } from '@inertiajs/react'

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link, index) => (
        <Link
          preserveScroll
          key={index}
          href={link.url || '#'}
          className={`inline-block mx-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            ${!link.url ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={!link.url}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  )
}
