import { Link } from "react-router-dom";
import React from "react";
import "../Guideline/Guideline.css"

function Guideline() {
    return (
        <div>
            <div className="guideline step1">
                <div>
                    <h1>Step 1</h1>
                </div>
                <img src="/service.png" alt="img" />
            </div>

            <div className="guideline step2">
                <div>
                    <h1>Step 2</h1>
                </div>
                <img src="/login.png" alt="img" />
            </div>

            <div className="guideline step3">
                <div>
                    <h1>Step 3</h1>
                </div>
                <img src="/register.png" alt="img" />
            </div>

            <div className="guideline step4">
                <div>
                    <h1>Step 4</h1>
                </div>
                <img src="/payment.png" alt="img" />
            </div>

            <div className="guideline step5">
                <div>
                    <h1>Step 5</h1>
                </div>
                <img src="/verify.png" alt="img" />
            </div>
            
            <div className="guideline step6">
                <div>
                    <h1>Step 6</h1>
                </div>
                <img src="/notation.png" alt="img" />
            </div>

            <div className="footer">
                <div className="flex-row space-x-5">
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-facebook"></i>
                </div>
                <p>© 2024 Pilyr. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Guideline;