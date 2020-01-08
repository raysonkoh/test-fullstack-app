import customAxios from '../config/customAxios';

const onClickLogout = (e, props, customSetUser) => {
  customAxios.get('./auth/logout');
  customSetUser(null);
  props.history.push('/');
};

export default onClickLogout;
