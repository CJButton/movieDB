import React from 'react';

type HyphenText = {
    [key: string]: {
        left: string,
        right: string
    }
};

const hyphenText: HyphenText = {
    movie: {
        left: 'Director: ',
        right: 'Runtime: ',
        },
    tv: {
        left: 'Created By: ',
        right: 'Runtime: ',
    },
    person: {
        left: 'Known for: ',
        right: 'Gender: ',
    },
};

type Props = {
    type: string;
    leftOfHyphen: string | null;
    rightOfHyphen: string | null;
}

const RenderExtras = ({ type, leftOfHyphen, rightOfHyphen }: Props) => {
    return(
        <div className='movie-extras'>
            { !!leftOfHyphen && 
                <p className='movie-director'>
                    {hyphenText[type].left}
                    {leftOfHyphen}
                </p>
            }
            { !!leftOfHyphen && !!rightOfHyphen && <p className='extras_hyphen'>-</p> }
            { !!rightOfHyphen && 
                <p className='movie-runtime'>
                    {hyphenText[type].right}
                    {rightOfHyphen}
                </p>
            }
        </div>
    );
};

export default RenderExtras;