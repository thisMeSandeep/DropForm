"use client"

import { Send } from "lucide-react"
import { useState, useEffect } from "react"

const prompts = [
    "Create a form to collect student data. Include fields- Name, email, course, batch and phone.",
    "Build a contact form with name, email, subject, message fields and a submit button.",
    "Design a registration form for a workshop with name, email, phone, company, and dietary preferences.",
    "Generate a feedback form with rating scale, comment section, and optional contact information."
]

const AnimatedTextArea = () => {

    const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isTyping, setIsTyping] = useState(true)
    const [charIndex, setCharIndex] = useState(0)
    const [isFocused, setIsFocused] = useState(false)
    const [userText, setUserText] = useState("")

    useEffect(() => {
        if (isFocused || userText) return

        const currentPrompt = prompts[currentPromptIndex]

        if (isTyping && charIndex < currentPrompt.length) {
            // Typing animation
            const timeout = setTimeout(() => {
                setDisplayText(currentPrompt.slice(0, charIndex + 1))
                setCharIndex(charIndex + 1)
            }, 30)
            return () => clearTimeout(timeout)
        } else if (isTyping && charIndex === currentPrompt.length) {
            // Finished typing, wait before starting to delete
            const timeout = setTimeout(() => {
                setIsTyping(false)
            }, 2000)
            return () => clearTimeout(timeout)
        } else if (!isTyping && charIndex > 0) {
            // Deleting animation
            const timeout = setTimeout(() => {
                setDisplayText(currentPrompt.slice(0, charIndex - 1))
                setCharIndex(charIndex - 1)
            }, 20)
            return () => clearTimeout(timeout)
        } else if (!isTyping && charIndex === 0) {
            // Finished deleting, move to next prompt
            const timeout = setTimeout(() => {
                setCurrentPromptIndex((prev) => (prev + 1) % prompts.length)
                setIsTyping(true)
            }, 300)
            return () => clearTimeout(timeout)
        }
    }, [charIndex, isTyping, currentPromptIndex, isFocused, userText])

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
        if (!userText) {
            // Reset animation when user clears text
            setDisplayText("")
            setCharIndex(0)
            setIsTyping(true)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserText(e.target.value)
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-12 px-4">
            <div className="relative">
                <textarea
                    value={userText}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full min-h-32 border border-gray-100/20 bg-black/20 backdrop-blur-md rounded-2xl p-5 pr-14 resize-none focus:outline-none focus:border-gray-100/40 transition-all duration-300 text-white/90 placeholder:text-white/30"
                    placeholder={displayText || "Type your prompt here..."}
                />
                <button className="absolute bottom-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gray-100/20 text-white rounded-xl hover:scale-110 transition-all duration-300 cursor-pointer">
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default AnimatedTextArea