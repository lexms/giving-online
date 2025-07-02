import { BackButton } from "@/components/ui/back-button"
import { cache } from "react"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { privacyPolicyContent } from "./content"

// Create a cached processor for markdown conversion
const processMarkdown = cache(async (content: string) => {
  const file = await unified()
    .use(remarkParse) // Parse markdown to mdast
    .use(remarkGfm) // Support GFM (tables, footnotes, etc.)
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to hast
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to HTML string
    .process(content)

  return String(file)
})

export default async function PrivacyPolicyPage() {
  // Process markdown content
  const htmlContent = await processMarkdown(privacyPolicyContent)

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 overflow-x-hidden">
        <div className="mb-8">
          <BackButton />
        </div>
        <article
          className="prose prose-gray max-w-none break-words
            prose-headings:font-semibold prose-headings:scroll-mt-20
            prose-h1:text-4xl prose-h1:mb-12 prose-h1:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-base prose-p:leading-7 prose-p:mb-6
            prose-ul:my-6 prose-li:my-2
            prose-strong:font-semibold
            prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:no-underline hover:prose-a:underline
            prose-a:break-words
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300
            prose-blockquote:pl-4 prose-blockquote:italic"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown content is sanitized
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </div>
  )
}
