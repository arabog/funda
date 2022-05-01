import React, { useState } from 'react';
import './App.css';
import ConfirmMemo from './compo/confirm/Confirm';


interface Dialog {
	confirmOpen: boolean;
	confrimCancel: boolean;
	handleOkClick: () => void;
	handleOkCancel: () => void;
}


const App: React.FC<Dialog>  = () => {
	const [confirmOpen, setConfirmOpen] = useState(true);
	const [confirmCancel, setConfirmCancel] = useState(true);

	const handleOkClick = () => {
		setConfirmOpen(false)
	}

	const handleOkCancel = () => {
			setConfirmCancel(false)
	}

	return (
		<ConfirmMemo 
			open={confirmOpen}
			cancel={confirmCancel}
			title="React and TypeScript"
			content="Are you sure you want to learn React and TypeScript?"
			cancelCaption ='No way'
			okCaption = 'Yes pls!'
			onOkClick = {handleOkClick}
			onCancelClick = {handleOkCancel}
		/>
	);
}

export default App;
