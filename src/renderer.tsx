import 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
    interface ContextRenderer {
        (content: string | Promise<string>, props?: { title?: string }): Response
    }
}

export const renderer = jsxRenderer(
    ({ children, title }) => {
        return (
            <html>
                <head>
                    <link href="/static/style.css" rel="stylesheet" />
                    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <title>{title}</title>
                </head>
                <body>
                    {children}
                    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "617493207c814f5290d56db41d569c91"}'></script>
                </body>
            </html>
        )
    },
    {
        docType: true
    }
)
