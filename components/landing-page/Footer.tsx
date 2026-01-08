import Link from "next/link"

const navlinks = [
  { link: "Home", path: "/" },
  { link: "Demo", path: "/#demo" },
  { link: "Features", path: "/#features" },
  { link: "Pricing", path: "/#pricing" },
  { link: "Contact", path: "/#contact" },
]

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 px-4 sm:px-6 md:px-8 pt-12 pb-6 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold bg-linear-to-t from-gray-200/20 to-white bg-clip-text text-transparent">
          Drop Form
        </Link>
        {/* Nav Links */}
        <nav>
          <ul className="flex space-x-7 text-white/70 text-base">
            {navlinks.map(({ link, path }) => (
              <li key={link}>
                <Link
                  href={path}
                  className="hover:text-white/90 transition-colors duration-300"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Drop Form. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
