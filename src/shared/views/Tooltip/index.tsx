import React from 'react';
import PropTypes from 'prop-types';
import "./styles.css";

const Tooltip = (props: any) => {
    const { title, children, position, containerClass, theme, isDom, } = props;
    
    return (
        <div className={`tooltip relative inline-block group ${containerClass}`}>
            {children}
            <div className={`tooltiptext visible absolute w-[120px] text-center py-[4px] px-[8px] rounded-[3px] z-10 opacity-0 transition-opacity shadow-cs-3 group-hover:opacity-100 group-hover:scale-100
            ${theme === 'dark' ? `bg-slate-950 text-white` : `bg-white text-neutral-900 border-[1px] border-neutral-800`} 
            ${position === "right" && "top-[-5px] left-[125%] after:content-[''] after:absolute after:top-1/2 after:right-full after:mt-[-5px] after:border-4 after:border-t after:border-r after:border-b after:border-transparent after:border-l-5 after:border-slate-950"}
            ${position === "bottom" && "top-[80%] left-1/2 ml-[-60px] after:content-[''] after:absolute after:left-[48%] after:top-[-40%] after:ml-[-5px] after:border-[5px] after:border-t-transparent after:border-r-transparent after:border-b-[.5rem] after:border-l-transparent after:border-slate-950"}
            ${position === "top" && "bottom-[80%] left-1/2 ml-[-60px] after:content-[''] after:absolute after:left-[48%] after:top-full after:ml-[-5px] after:border-[5px] after:border-t-[.125rem] after:border-r-transparent after:border-b-transparent after:border-l-transparent after:border-slate-950"}
            `}>
                {isDom ? (<div dangerouslySetInnerHTML={{ __html: title }}></div>) : (title)}
                <span className="absolute left-1/2 translate-x-[-50%] top-[-10px] border-l-8 border-r-8 border-b-10 border-white z-1"></span>
            </div>
        </div>
    );
};

export default Tooltip;

Tooltip.defaultProps = {
    title: '',
    children: React.createElement('div'),
    position: 'bottom',
    containerClass: '',
    theme: 'dark',
};

Tooltip.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    position: PropTypes.string,
    containerClass: PropTypes.string,
    theme: PropTypes.string,
};
