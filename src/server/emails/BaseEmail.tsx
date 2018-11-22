import * as React from 'react'
import { Email, Item, Span, Box, renderEmail } from 'react-html-email'

const css = `
@media only screen {
  td.header {
    background-color: #2B8BB7;
  }
  td.content {
  }
  td.footer {
    background-color: #F0F0F0;
  }
  .contentHeader {
    //border: 1px solid black;
    text-align: left; 
  }
  .contentFooter {
    //border: 1px solid black;
    text-align: left;
  }
}`.trim()

const header = {
  height: '10%',
  className: 'header',
  align: 'center',
  bgcolor: '#2B8BB7'
}

const headerFont = {
  fontSize: 20,
  color: 'white'
}

const content = {
  height: '72%',
  className: 'content'
}

const contentHeader = {
  height: '80%',
  className: 'contentHeader',
  align: 'left',
}

const contentFooter = {
  height: '20%',
  className: 'contentFooter',
  align: 'left',
}

const footer = {
  height: '10%',
  className: 'footer',
  align: 'center',
  fontSize: 14,
  bgcolor: '#F0F0F0'
}

const footerFont = {
  fontSize: 12,
}

const container = {
  height: '600px',
  width: '340px'
}

const contentBox = {
  height: '430px',
  width: '340px',
  align: 'center'
}

const renderHtml = (opts: {content: any, footer: any, title: any}) => {
  return renderEmail(
    <Email title={opts.title} headCSS={css}>

    <Item>
      <Box {...container}>

        <tr>
          <td {...header}>
          <Span {...headerFont}>ZFundraising</Span>
          </td>
        </tr>

        <tr>
          <td {...content}>
            <Box {...contentBox}>
              <tr>
                <td {...contentHeader}>
                <br />
                {opts.content}
                </td>
              </tr>
              <tr>
                <td {...contentFooter}>
                {opts.footer}
                <br/><br/>
                </td>
              </tr>
            </Box>
          </td>
        </tr>

        <tr>
          <td {...footer}>
          <Span {...footerFont}>&copy; 2018 ZFundraising</Span>
          </td>
        </tr>
      </Box>
    </Item>
  </Email>
  )
}

function getHost() {
  const env = process.env.NODE_ENV
  if (env === 'production') {
    return 'https://0.0.0.0:8080'
  }
  else {
    return 'http://0.0.0.0:3000'
  }
}

export abstract class BaseEmail {
  abstract renderText(opts: any) : string
  abstract renderHtml(opts: any) : string
  _renderHtml = renderHtml.bind(null)
  static _getHost = getHost.bind(null)
}