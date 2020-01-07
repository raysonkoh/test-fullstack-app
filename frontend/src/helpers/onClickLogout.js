const onClickLogout = (e, props, customSetUser) => {
  customSetUser(null);
  props.history.push('/');
};

export default onClickLogout;
