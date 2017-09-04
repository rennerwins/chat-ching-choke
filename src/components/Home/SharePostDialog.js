import React, { Component } from 'react'
import Dialog, {
	DialogActions,
	DialogContent
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'

class SharePostDialog extends Component {
	handleSubmit = () => {
		this.props.close()
	}
	render() {
		return (
			<Dialog
				open={this.props.open}
				onRequestClose={this.props.close}
				ignoreBackdropClick={true}
				ignoreEscapeKeyUp={true}
			>
				<DialogContent>
          {
            this.props.couponIsAdded ? <h1>You will now receive an extra coupon</h1> : <h1>You already received an extra coupon</h1>
          }
          {
            this.props.error && <h1>Please share a post first</h1>
          }
					
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleSubmit} color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default SharePostDialog
