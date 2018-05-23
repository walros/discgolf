import ReactDOMServer from 'react-dom/server'
import React from 'react'
import config from '../config'

export default function render(req, res) {
  return renderPage(req, res)
}

function renderPage(req, res) {
  const appScriptSrc = config.useWebpackDevServer
    ? `http://${config.webpack.host}:${config.webpack.port}/app.js`
    : '/build/app.js'
  const linkStyles = config.useWebpackDevServer
    ? ''
    : '<link href="/build/app.css" rel="stylesheet" />'

  res.status(200).send(getPageHtml({appScriptSrc, linkStyles}))
}

function getPageHtml({appScriptSrc, linkStyles}) {
  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Discgolf</title>
        <meta
          name="description"
          content="about discgolf"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&amp;subset=latin-ext"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/images/favicon.png" />
        {linkStyles}
      </head>
      <body>
        <div id="app" />
        <script type="text/javascript" src={appScriptSrc} defer />
      </body>
    </html>
  )
}
