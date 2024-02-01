import { Link } from "react-router-dom";
import React from "react";
import "../Guideline/Guideline.css"

function Guideline() {
    return (
        <div>
            <div className="guideline bg-teal-100">
                <div className="step">
                    <h1>Bước 1</h1>
                </div>
                <img src="/service.png" alt="img" />
            </div>

            <div className="guideline bg-teal-100">
                <img src="/login.png" alt="img" />
                <div className="step">
                    <h1>Bước 2</h1>
                </div>
            </div>

            <div className="guideline bg-teal-100 ">
                <div className="step">
                    <h1>Bước 3</h1>
                </div>
                <img src="/register.png" alt="img" />
            </div>

            <div className="guideline bg-teal-100 ">
                <img src="/payment.png" alt="img" />
                <div className="step">
                    <h1>Bước 4</h1>
                </div>
            </div>

            <div className="guideline bg-teal-100 ">
                <div className="step">
                    <h1>Bước 5</h1>
                </div>
                <img src="/verify.png" alt="img" />
            </div>
            
            <div className="guideline bg-teal-100">
                <img src="/notation.png" alt="img" />
                <div className="step">
                    <h1>Bước 6</h1>
                </div>
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