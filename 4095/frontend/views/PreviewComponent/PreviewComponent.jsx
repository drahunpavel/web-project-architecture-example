import React, {PureComponent} from 'react';

import('./PreviewComponent.scss');

class PreviewComponent extends PureComponent{

    static defaultProps = {
        answer: {}
    };

    render(){
        const { answer } = this.props;
        console.log('--answer', answer)
        return(
            <div className='PreviewComponent'>
                <h6>
                    Status:
                    <small className="text-muted">{answer.status}</small>
                </h6>
                <textarea className="form-control" value={JSON.stringify(answer.data)} rows="13"></textarea>
            </div>
        );
    };
};

export default PreviewComponent;