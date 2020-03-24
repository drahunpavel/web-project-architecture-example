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
                    <small className="text-muted">{preview.data && preview.data.status}</small>
                </h6>
                head
                <textarea className="form-control" value={preview && JSON.stringify(preview.data.headers)} rows="3"></textarea>
                body
                <textarea className="form-control" value={preview && JSON.stringify(preview.data.data)} rows="6"></textarea>
            </div>
        );
    };
};

const mapStateToProps = ({windows}) => ({windows});

export default connect(mapStateToProps, null)(PreviewComponent);