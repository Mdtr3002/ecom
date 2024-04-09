import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const CreateNewButton = () => {
    return(
        <>
            <div className="create-new-button">
                <OverlayTrigger placement="left" 
                    delay={{ show: 250, hide: 400 }} 
                    overlay={
                        <Tooltip id="CreateNewID" >
                          GDSC Game
                        </Tooltip>
                    }
                >
                    <Link 
                        className="shadow-lg btn btn-warning" 
                        to="/"
                    >
                        <i className="fz-20 bi bi-info-lg" />
                    </Link>
                </OverlayTrigger>
            </div>
        </>
    )
}

export default CreateNewButton;
