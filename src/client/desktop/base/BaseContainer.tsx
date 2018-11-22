import { screenSize } from '../../helpers/DeviceHelper'
import BaseState from './BaseState'
import BaseProps from './BaseProps'
import * as React from 'react'
import theme from '../../theme'
import { TitleBar } from '../components/TitleBar'
import { Loading } from '../components/Loading'
import { Error } from '../components/Error'

interface Style {
  container: React.CSSProperties
}

abstract class BaseContainer<P extends BaseProps | {}, S extends BaseState> extends React.Component<P, S> {

	abstract state: S
	
	abstract renderContent(): JSX.Element

	style: Style = {
		container: {
			background: theme.palette.background.default,
		}
	}

	renderError(err): JSX.Element {
		if (!err) err = this.state.err
		const errorStyle: React.CSSProperties = {
			...this.style.container,
			height: screenSize().height
		}
		return (
			<div style={errorStyle}>
				<TitleBar hideSearchBar title='Aw, Snap :(' />
				<Error message={err}/>
			</div>
		)
	}

  render(): JSX.Element {
		if (this.state.err) return this.renderError(this.state.err)
		else if (this.state.loading) {
			const loadingStyle: React.CSSProperties = {
				...this.style.container,
				height: screenSize().height
			}
			return (
				<div style={loadingStyle}>
					<TitleBar hideSearchBar title="Loading..." />
					<Loading />
				</div>
			)
		}
		else return this.renderContent()
  }

}

export default BaseContainer