import * as React from 'react'
import BaseContainer from '../base/BaseContainer'
import BaseState from '../base/BaseState'
import BaseProps from '../base/BaseProps'
import BaseStyle from '../base/BaseStyle'
import TitleBar from '../components/TitleBar'
import getLog from '../../utils/log'
import { colors } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {deserializeArray} from '../../utils/json'
import axios from 'axios'

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