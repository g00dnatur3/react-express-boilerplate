import * as React from 'react'
import BaseStyle from '../base/BaseStyle'
import getLog from '../../utils/log'
const log = getLog('OfferDetails')

interface Props { 

}

class Style extends BaseStyle {
  container: React.CSSProperties = {

  }
}

export class TemplateComponent extends React.Component<Props, {}> {

  render(): JSX.Element {
    const style: Style = new Style()
    return (
      <div style={style.container}>
        BOO
      </div>
    )
  }
  
}

export default TemplateComponent