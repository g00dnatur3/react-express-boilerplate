import {deserialize} from '../../../utils/json'
import * as React from 'react'
import BaseContainer from '../base/BaseContainer'
import BaseState from '../base/BaseState'
import BaseStyle from '../base/BaseStyle'
import qs from 'query-string'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import TitleBar from '../components/TitleBar'

import getLog from '../../../utils/log'
const log = getLog('LandingPage')

interface State extends BaseState {

}

class Style extends BaseStyle {
	container: React.CSSProperties = {
		marginBottom: 20,
		//maxWidth: 1920,
		minWidth: 800,
		//textAlign: 'center',
		margin: '0 auto',
	}

	offer: React.CSSProperties = {
		maxWidth: 320, minWidth: 310, marginBottom: 25, marginTop: 0
	}

	content: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		//alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		//justifyItems: 'center',
    // borderWidth: 1,
		// borderStyle: 'solid',
	}

  separator: React.CSSProperties = {
    ...this.separator,
		marginTop: 20
	}
}

export class LandingPage extends BaseContainer<{}, State> {
	
	state: State = {loading: true}

	componentDidMount() {
		setTimeout(() => this.setState({loading: false}), 1000)
		// const params = qs.parse(location.search)
		// if (!params.fr) {
		// 	const err = 'missing required query-param: fr'
		// 	this.setState({err, loading: false})
		// }
		// else {
		// 	const user = getUser()
		// 	let url = '???'
		// 	log.info('GET -> ' + url)
		// 	axios.get(url)
		// 	.then(res => {
		// 		log.info(res.data)
		// 		this.setState({loading: false})
		// 	})
		// 	.catch(err => {
		// 		//console.log(err)
		// 		const message = err.message || err
		// 		this.setState({loading: false, err: message})
		// 	})
		// }
	}

	componentDidUpdate() {

	}

	renderContent() {
		const style: Style = new Style()
		return (
			<div style={style.container}>
				<TitleBar 
					hideSearchBar
					//leftIcon='menu' 
					//rightIcon='cart'
					title={'Hello'} 
					//searchValue={this.state.searchterm}
					//onSearchChange={(val) => this.setState({searchterm: val})}
					//onCancelSearch={() => this.setState({searchterm: ''})}
				/>
				<div style={{paddingTop: 25}}></div>
				<div style={style.content}>
				World
				</div>
			</div>
		)
	}
	
}