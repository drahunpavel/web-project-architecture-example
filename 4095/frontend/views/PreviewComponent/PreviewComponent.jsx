import React, {PureComponent} from 'react';
import { connect } from 'react-redux';

import('./PreviewComponent.scss');

class PreviewComponent extends PureComponent{

    render(){
        const { preview } = this.props.windows;
        return(
            <div className='PreviewComponent'>
                <h6>
                    Status:
                    <small className="text-muted">{preview.status}</small>
                </h6>
                <textarea className="form-control" value={preview && JSON.stringify(preview.data)} rows="13"></textarea>
            </div>
        );
    };
};

const mapStateToProps = ({windows}) => ({windows});

export default connect(mapStateToProps, null)(PreviewComponent);