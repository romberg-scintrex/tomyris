import { MenuItem } from '@blueprintjs/core';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

interface OwnProps {
  text: string;
  to: string;
}

interface DispatchProps {
  navigate: (to: string) => void;
}

function MenuItemLink({ text, to, navigate }: OwnProps & DispatchProps) {
  return <MenuItem text={text} onClick={() => navigate(to)} />;
}

const mapDispatchToProps = {
  navigate: push,
};

export default connect<null, typeof mapDispatchToProps, OwnProps>(
  null,
  mapDispatchToProps
)(MenuItemLink);
