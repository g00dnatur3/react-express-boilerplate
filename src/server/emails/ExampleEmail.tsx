// import * as React from 'react'
// import { BaseEmail } from './BaseEmail'
// import { Span, A } from 'react-html-email'

// EXAMPLE EMAIL TEMPLATE

// const title = 'Thank You for your purchase'

// const _renderText = (opts: {certificates: SoldCertificate[], user: User}) => {
//   const fr = opts.certificates[0].fundraiser
//   return `
//     ${title}\n
//     Hi {opts.user.name},\n
//     Thank you for helping ${fr ? fr.name : 'your shcool'}!
//   `
//   + opts.certificates.map(c => {
//     return `
//     business: ${c.business ? c.business.name : ''}
//     value: ${c.value}
//     code: ${c.code}
//     `
//   }).join('\n')
// }

// const _htmlContent = (opts: {certificates: SoldCertificate[], user: User}) => {
//   const fr = opts.certificates[0].fundraiser
//   const host = BaseEmail._getHost()
//   return (<Span fontSize={14} color="black">
//     Hi {opts.user.name},
//     <br/><br />
//     Thank you for helping {fr ? fr.name : 'your shcool'}!
//     <br />
//     You've purchased the following certificates:
//     <br /><br />
//     {opts.certificates.map((c) => {
//       return (<Span fontSize={14}>
//         <A textDecoration="none" href={`${host}/certificate?c=${c._id}`}>{c.business ? c.business.name : ''}, {c.offer ? c.offer.name : ''} ${c.value}</A>
//         <br/><br />
//       </Span>)
//     })}
//     You can simply present the certificate on your phone when shopping at the above business locations.
//   </Span>)
// }

// const _htmlFooter = () => {
//   return (
//     <Span fontSize={14}>
//     <br/>
//     At any time, if you have any questions, you can reach out to us at feedback@zfundraising.com.
//     <br/><br/>
//     Sincerely,
//     <br/><br/>
//     Your ZFundraising Team
//     </Span>
//   )
// }

// class PurchaseEmail extends BaseEmail {
//   renderText = _renderText
//   renderHtml(opts: {certificates: SoldCertificate[], user: User}) {
//     const content = _htmlContent(opts)
//     return this._renderHtml({content, title, footer: _htmlFooter()})
//   }
// }

// const _PurchaseEmail = new PurchaseEmail()
// export const renderHtml = _PurchaseEmail.renderHtml.bind(_PurchaseEmail)
// export const renderText = _PurchaseEmail.renderText.bind(_PurchaseEmail)