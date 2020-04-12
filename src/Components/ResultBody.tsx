import React from 'react'
import Ratings from './Ratings'
import Preview from './Preview'
import RenderExtras from './RenderExtras';
import TruncateText from './TruncateText'

type ResultsBodyType = {
    header: string,
    subtitle?: string | null,
    leftOfHyphen: string | null,
    type: string,
    rightOfHyphen: string | null,
    overview: string,
    displayVotes?: boolean | undefined,
    voteAverage?: number
    preview?: string | null
}

const ResultBody = (props: ResultsBodyType) => {
    const {
        subtitle = null,
        leftOfHyphen = null,
        rightOfHyphen = null,
        preview = null,
        voteAverage = null,
        displayVotes = true,
        header,
        type,
        overview
    } = props;

    return(
        <div className='type-wrapper'>
            <div>
                <div className='title-wrapper'>
                    <h5 className='result-title'>{header}</h5>
                    {subtitle && <h5 className='type-year'>{subtitle}</h5>}
                </div>

                <RenderExtras 
                    type={type} 
                    leftOfHyphen={leftOfHyphen} 
                    rightOfHyphen={rightOfHyphen} />
                
                <div>
                    <p className='result-overview'>
                        <TruncateText>
                            { overview }
                        </TruncateText>
                    </p>
                </div>
            </div>
            <div className='movie-ratings'>
                { displayVotes && <Ratings votes={voteAverage} />}
                { preview && <Preview previewID={preview} />}
            </div>
        </div>
    );
};

export default ResultBody;