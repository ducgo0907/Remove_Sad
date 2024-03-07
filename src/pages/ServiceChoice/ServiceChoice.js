import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './service_choice.css'; // Custom CSS file for additional styling if needed
import { useNavigate } from 'react-router-dom';

function ServiceChoice() {

    const nav = useNavigate();
    const goToAnotherPage = (path) => {
        nav(path);
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user && user != undefined && user != ""){
            const userObject = JSON.parse(user);
            if(userObject.isAdmin){
                nav("/home")
            }
        }
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="rectangle rectangle1" onClick={() => goToAnotherPage("/home")}>
                        <span className='text-service'>Trò chuyện cùng Pilyr</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="rectangle rectangle3" onClick={() => goToAnotherPage("/meet")}>Gặp mặt trực tiếp</div>
                </div>
            </div>
        </div>
    );
}

export default ServiceChoice;
