import React from "react";

const Modal = ({ modalTitle, opened, setOpen, content }) => {
	return (
		<div class={`modal ${opened ? `active` : ``}`} id="modal-id">
			<a href="#close" class="modal-overlay" aria-label="Close"></a>
			<div class="modal-container">
				<div class="modal-header">
					<a
						onClick={() => {
							setOpen(false);
						}}
						class="btn btn-clear float-right"
						aria-label="Close"
					></a>
					<div class="modal-title h5">{modalTitle}</div>
				</div>
				<div class="modal-body">
					<div class="content">{content}</div>
				</div>
				<div class="modal-footer">...</div>
			</div>
		</div>
	);
};

export default Modal;
