import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from 'material-ui/Dialog'

const DialogBox = ({ openDialog, close, title, children, confirm }) => {
	return (
		<div>
			<Dialog open={openDialog} onRequestClose={close}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{children}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={close} color="accent">
						ยกเลิก
					</Button>
					<Button onClick={confirm} color="primary">
						ยืนยัน
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DialogBox
