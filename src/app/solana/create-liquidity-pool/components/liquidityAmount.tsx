
import React, {useState, useEffect, use} from "react";

import HideToken from "../../../../assets/images/logo/crypto/question-mark.png";  



export default function LiquidityAmount({ tokenType }: { tokenType: string }) {

    return (
        <div className="lq_amount_block p-3">
           <div className="lq_amount_block_top d-flex align-items-center">
                <div className="h-45 w-45 d-flex-center b-r-50 overflow-hidden me-2">
                    <img id={'lq_amount_avtr_'+tokenType} alt="avtar"  className="img-fluid" src={HideToken.src} />
                </div>
                <div style={{width: '100%'}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span id={'lqab_'+tokenType+'_name'} className="me-2">{tokenType === 'base' ? 'Base' : 'Quote'}</span> 
                            <span id={'lqab_'+tokenType+'_symbol'}></span>
                        </div>
                        <div className="lqab_balance">Balance <span id={'lqab_'+tokenType+'_balance'}>0.0000</span></div>
                    </div>
                    <div className="lq_amount_block_address" id={'lqab_'+tokenType+'_address'}>-</div>
                </div>
           </div>
           {/* <div>
                <input type="text" name="" id="" />
           </div> */}
        </div>
    )
}