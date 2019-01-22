import * as React from 'react'
import BaseContainer from '../desktop/base/BaseContainer'
import BaseState from '../desktop/base/BaseState'
import BaseProps from '../desktop/base/BaseProps'
import BaseStyle from '../desktop/base/BaseStyle'
import TitleBar from '../desktop/components/TitleBar'
import getLog from '../../utils/log'

const log = getLog('MyPage')

class Style extends BaseStyle {
	container: React.CSSProperties = {
		//background: theme.palette.background.default,
		paddingBottom: 20,
	}
}

interface State extends BaseState {

}

interface Props extends BaseProps {}

export class TemplatePage extends BaseContainer<Props, State> {
	
	state: State = {loading: true}

	componentDidMount() {
    this.setState({loading: false})
	}
  
	renderContent() {
    const style: Style = new Style()
		return (
			<div style={style.container}>
				<TitleBar 
					hideSearchBar
          leftIcon='back'
          // rightIcon='cart'
          leftClick={() => this.props.history.goBack()}
          title={'Payment'} />
				<div style={{paddingTop: 52}}></div>
			</div>
		)
	}
	
}