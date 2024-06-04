import React from 'react';

const CommentComponent = ({ dataHref, width }) => {
  return (
    <div style={{ margin: '-10px -12px 0' }}>
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>
    </div>
  );
};

CommentComponent.defaultProps = {
  width: '100%', // Giá trị mặc định cho width là '100%'
};

export default CommentComponent;
