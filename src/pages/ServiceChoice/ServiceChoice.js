import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './service_choice.css'; // Custom CSS file for additional styling if needed
import { useNavigate } from 'react-router-dom';

function ServiceChoice({user}) {

    const nav = useNavigate();
    const goToAnotherPage = (path) => {
        nav(path);
    }
    return (
        <>
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
        {/* {user.isVipMember && <div className='advertis'>
            <img src='nonFatBakery.png' alt='img'/>
            <img src='wonderlandStore.png' alt='img'/>
            <img src='owlBeauty.png' alt='img'/>
        </div>
        } */}

        <div className='advertis'>
            <a className='nonfat' href="https://www.facebook.com/profile.php?id=61555888590527" target="_blank" rel="noreferrer">
                <img src='nonFatBakery.png' alt='img'/>
            </a>
            <a className='wonder' href="https://www.facebook.com/Wonderlandstoreexe" target="_blank" rel="noreferrer">
                <img src='wonderlandStore.png' alt='img'/>
            </a>
            <a className='owl' href="https://www.facebook.com/profile.php?id=61555679864702" target="_blank" rel="noreferrer">
                <img  src='owlBeauty.png' alt='img'/>
            </a>
        </div>
        </>
    );
}

export default ServiceChoice;
