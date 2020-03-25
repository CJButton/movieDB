import React from 'react';

const LoaderIcon = () => {
    return (
        <div className="loader-icon">
            <i className="fa fa-cog fa-spin" />
        </div>
    )
}

const Loader = () => {
    return (
        <>
            <div className='loader-wrapper'/>
            <LoaderIcon />
        </>
    );
}

export default Loader;