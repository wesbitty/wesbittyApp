import { Metadata } from './Metadata'

const generateDocsRssItem = (doc: {
  [x: string]: any; url_path: any; title: any; description: any; date: string | number | Date 
}) => `
<item>
  <guid>${Metadata.Url}/${doc.url_path}</guid>
  <title>${doc.title}</title>
  <link>${Metadata.Url}/${doc.url_path}</link>
  <lastModified>${new Date().toUTCString()}</lastModified>
</item>
`

export const generateRss = (posts: any[]): string => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - ${Metadata.Name}</title>
      <link>${Metadata.Url}</link>
      <description>The Wesbitty Blog | Updates, Tips, Ideas, Trends to help developers build application's</description>
      <language>${Metadata.Locale}</language>
      <lastModified>${new Date(posts[0].date).toUTCString()}</lastModified>
      <atom:link href="${Metadata.Url}/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateDocsRssItem).join('')}
    </channel>
  </rss>
`
}