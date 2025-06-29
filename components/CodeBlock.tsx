import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useState } from 'react'
import type { CodeComponent } from 'react-markdown/lib/ast-to-react'

const CodeBlock: CodeComponent = ({ inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(children))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (inline) {
    return (
      <code className="px-1 py-0.5 rounded bg-gray-800 text-gray-100 text-sm" {...props}>
        {children}
      </code>
    )
  }

  return (
    <pre className="relative rounded-xl bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] p-4 overflow-auto text-sm text-white my-4 border border-gray-700 shadow-lg">
      <code className={className} {...props}>
        {children}
      </code>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-gray-300 bg-gray-800/70 hover:bg-gray-700/80 border border-gray-600 px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-white backdrop-blur-sm"
      >
        {copied ? (
          <>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </button>
    </pre>
  )
}
