"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { BorderBeam } from "../ui/border-beam"
import { useRouter } from "next/navigation"

const navlinks = [
    { link: "Home", path: "/#home" },
    { link: "Demo", path: "/#demo" },
    { link: "Features", path: "/#features" },
    { link: "Pricing", path: "/#pricing" },
    { link: "Contact", path: "/#contact" },
]

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }


    const router = useRouter();

    return (
        <div
            className={`text-white/90 px-4 sm:px-6 md:px-10 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-black/20 backdrop-blur-md border-b border-b-gray-100/30 shadow-lg"
                : "md:bg-transparent bg-black/20 backdrop-blur-md"
                }`}
        >
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo  - With text gradient*/}
                <Link href="/" className="text-lg font-semibold bg-linear-to-t from-gray-200/20 to-white bg-clip-text text-transparent">
                    Drop Form
                </Link>

                {/* Desktop Navlinks */}
                <ul className="hidden md:flex items-center space-x-10 border border-gray-100/20 px-5 py-2.5 rounded-4xl">
                    {
                        navlinks.map((link) => (
                            <Link
                                key={link.link}
                                href={link.path}
                                className="hover:text-gray-100/40 transition-colors duration-300"
                            >
                                {link.link}
                            </Link>
                        ))
                    }
                </ul>

                {/* Desktop Action buttons */}
                <div className="hidden md:flex items-center space-x-10">
                    {/* Login  */}
                    <Link href="/login" className="hover:text-gray-100/40 transition-colors duration-300">
                        Login
                    </Link>
                    {/* Free  */}
                    <button className="relative px-5 py-2 rounded-4xl border border-gray-100/20 hover:scale-110 transition-all duration-500 cursor-pointer">
                        Start free trial
                        <BorderBeam />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 hover:text-gray-100/40 transition-colors duration-300"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-100/20 pt-4">
                    <ul className="flex flex-col space-y-4">
                        {navlinks.map((link) => (
                            <Link
                                key={link.link}
                                href={link.path}
                                onClick={closeMobileMenu}
                                className="hover:text-gray-100/40 transition-colors duration-300 py-2"
                            >
                                {link.link}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-3 pt-2">
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="hover:text-gray-100/40 transition-colors duration-300 py-2"
                            >
                                Login
                            </Link>
                            <button
                                onClick={() => router.push("/signup")}
                                className="relative px-5 py-2 rounded-4xl border border-gray-100/20 hover:scale-105 transition-all duration-500 cursor-pointer w-fit"
                            >
                                Start free trial
                                <BorderBeam />
                            </button>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar