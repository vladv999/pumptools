'use client';

export default function SuccessModal() {
    function closeModal() {
        const modals = document.querySelectorAll(".modal_es");
        modals.forEach((modal) => {
            (modal as HTMLDivElement).style.display = "none";
        });
        const modal_layout = document.querySelectorAll(".modal_layout");
        modal_layout.forEach((element) => {
            (element as HTMLDivElement).style.display = "none";
        });
    }

    return (
        <div id="createTokenSucceesModal" className="modal_es">
            <div className="modal_es_header">
                <h3><i className="iconoir-double-check me-2"></i> Success</h3>
                <button onClick={closeModal} className="top_modal_close"><i className="iconoir-xmark-square"></i></button>
            </div>
            <div className="modal_es_body" style={{ textAlign: "center" }}>
                <p>The token has been successfully created and sent to your wallet.</p>
                <p><b className="me-2">Token address:</b> <a target="_blank" id="newTokenLink" className="link_modal" href="https://solscan.io/token/"></a></p>
                <p className="mt-3"><b className="me-2">Signature:</b> <a target="_blank" id="newTokenSignatureLink" className="link_modal" href="https://solscan.io/tx/"><i className="iconoir-open-new-window me-2"></i> Open</a></p>
            </div>
            <div className="modal_es_footer text-center">
                <button onClick={closeModal} className="btn btn-light-success" type="button">Close</button>
            </div>
        </div>
    )
}