import * as React from 'react'
import BaseStyle from '../base/BaseStyle'
import ShareIcon from '@material-ui/icons/Share'
import Modal from '../components/Modal'
import {openModal} from '../../event'
import {screenSize} from '../../helpers/DeviceHelper'

import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
} from 'react-share';

import getLog from '../../../utils/log'
const log = getLog('Share')

interface Props { 
  businessId: string
}

class Style extends BaseStyle {
  shareIcon: React.CSSProperties = {
    paddingLeft: 6,
    paddingRight: 2,
    fontSize: 28,
    cursor: 'pointer'
  }
  shareText: React.CSSProperties = {
    fontSize: 14
  }
  modal: React.CSSProperties = {
    margin: 10,
    paddingTop: 10
  } 
  modalText: React.CSSProperties = {
    fontSize: 18,
    paddingLeft: 12
  }
  shareButton: React.CSSProperties = {
    ...this.row,
    paddingBottom: 15,
    paddingLeft: 30,
    alignItems: 'center',
    cursor: 'pointer'
  }
}

export class TemplateComponent extends React.Component<Props, {}> {

  modalId = () => `${this.props.businessId}-share`

  onClick() {
    if (navigator['share']) {
      navigator['share']({
        title: 'Web Fundamentals',
        text: 'Check out Web Fundamentals — it rocks!',
        url: 'https://developers.google.com/web',
      })
      .then(() => log.info('Successful share'))
      .catch((error) => log.info('Error sharing', error));
    }
    else openModal(this.modalId())
  }

  render(): JSX.Element {
    const style: Style = new Style()
    return (
      <div style={style.row}>
        <ShareIcon onClick={() => this.onClick()} style={style.shareIcon} />
        <div style={style.shareText}>Share</div>
				<Modal id={this.modalId()} style={{width: screenSize().width-100}}>
          <div style={style.modal}>

            <EmailShareButton
              style={style.shareButton}
              url='https://www.google.com'
              subject='title'
              body='body'>
              <EmailIcon size={40} round />
              <div style={style.modalText}>Email</div>
            </EmailShareButton>

            <FacebookShareButton
              style={style.shareButton}
              url='https://www.google.com'
              quote='hello world'>
              <FacebookIcon size={40} round />
              <div style={style.modalText}>Facebook</div>
            </FacebookShareButton>

            <TwitterShareButton
              style={style.shareButton}
              url='https://www.google.com'
              title='hello world'>
              <TwitterIcon size={40} round />
              <div style={style.modalText}>Twitter</div>
            </TwitterShareButton>

            <GooglePlusShareButton
              style={style.shareButton}
              url='https://www.google.com'>
              <GooglePlusIcon size={40} round />
              <div style={style.modalText}>Google+</div>
            </GooglePlusShareButton>

            <LinkedinShareButton
              style={style.shareButton}
              url='https://www.google.com'
              title='hello world'
              windowWidth={750}
              windowHeight={600}>
              <LinkedinIcon size={40} round />
              <div style={style.modalText}>LinkedIn</div>
            </LinkedinShareButton>

          </div>
				</Modal>

      </div>
    )
  }
  
}

export default TemplateComponent