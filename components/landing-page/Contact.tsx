import { Mail, Linkedin, X as XIcon } from "lucide-react"

const socials = [
  {
    name: "Email",
    Icon: Mail,
    href: "mailto:contact@dropform.com",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "X",
    Icon: XIcon,
    href: "https://x.com/dropform",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "LinkedIn",
    Icon: Linkedin,
    href: "https://linkedin.com/company/dropform",
    color: "from-blue-700 to-blue-400",
  },
]

const Contact = () => {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20 bg-transparent">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2 className="mb-4">
          <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Let’s Connect
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-100/70 mb-12">
          Reach out for partnerships, demos, enterprise inquiries, or support—<br className="hidden sm:inline" />we love to talk with forward-thinking teams!
        </p>

        {/* Social Icons List */}
        <div className="flex justify-center gap-8 mb-4">
          {socials.map(({ name, Icon, href, color }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={
                `group relative flex flex-col items-center justify-center w-16 h-16 rounded-full bg-[#0a0a1a] border border-white/10 shadow-md transition-all duration-300 hover:scale-110 overflow-hidden ` +
                `hover:ring-2 hover:ring-white/40 hover:bg-linear-to-br ${color}`
              }
            >
              <Icon className="w-7 h-7 text-white/80 transition-colors duration-300 group-hover:text-white" />
            </a>
          ))}
        </div>
        {/* Labels */}
        <div className="flex justify-center gap-8 text-sm text-gray-300/80 mt-2">
          {socials.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
