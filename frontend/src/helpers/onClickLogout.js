const onClickLogout = (e, props, customSetToken) => {
  customSetToken(null);
  props.history.push('/');
};

export default onClickLogout;
