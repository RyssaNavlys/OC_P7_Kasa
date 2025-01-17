// Import React components
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import PropTypes from 'prop-types';

// Import style
import "../../assets/style/collapse.scss";
import arrowTop from "../../assets/images/arrow-top.svg";

// Styled component to toggle collapse element with transition
const StyledCollapse = styled.div`
    height: ${({$height}) => $height}px;
`;

// Component to display a collapse menu
function Collapse({title = "Menu", content = [""], smallTitle = false}) {

    // State to define if menu is deployed or not
    const [isDeployed , setDeploy] = useState(false);
    function toggleCollapse() { isDeployed ? setDeploy(false) : setDeploy(true) }

    // State to store height of the component
    // useRef is used to get data from DOM
    // current.scrollHeight is the "auto" with of element
    const [height, setHeight] = useState(50);
    function updateHeight() {
        setHeight(isDeployed ? contentRef.current.scrollHeight + titleRef.current.scrollHeight : titleRef.current.scrollHeight);
    }
    const contentRef = useRef(null);
    const titleRef = useRef(null);

    // event Listener over the menu arrow
    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight); // Add resize listener
        return () => {
            window.removeEventListener('resize', updateHeight); // Clean up listener when component is unmount (avoid multiple actions on the same even + memory leak)
        };
    }),[isDeployed];

    // style variation depend on prop
    const addClass = smallTitle ? "collapse__title--small-title" : "";

    return (
        <StyledCollapse $height={height} className="collapse">
            <h3 ref={titleRef} className={`collapse__title ${addClass}`}><span>{title}</span><img className={`collapse__title__icon${isDeployed ? " collapse__title__icon--deployed" : ""}`} src={ arrowTop } alt="flèche"  onClick={() => toggleCollapse()}/></h3>
            <div ref={contentRef} className="collapse__content-wrapper">
                { content.map((element,index) => (
                    <p className="collapse__content-wrapper__element" key={`collapse-${index}`}>{element}</p>
                ))}
            </div>
        </StyledCollapse>
    );

}

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    smallTitle: PropTypes.bool
}


export default Collapse;