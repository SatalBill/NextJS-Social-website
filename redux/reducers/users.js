import * as actionTypes from "../actionTypes";

const initialState = {
  userList: [],
  specialUser: {},
  userListError: null,
  specialUserError: null,
  myProfile: {},
  myFriendsList: [],
  userProfile: {},
  phizUserProfile: {},
  myStream: {}
};

const BackColors = [
  "#99EE99E0",
  "#FF88EEE0",
  "#EEFF88E0",
  "#AAAAFFE0",
  "#DD9999E0",
  "#DDFFDDE0",
  "#88FFDDE0",
  "#DDDDFFE0",
  "#FFDDDDE0",
  "#CEECEEE0",
  "#FFEEDDE0",
  "#eeeeeeE0",
  "#cceeeeE0",
  "#eecceeE0",
  "#eeeeccE0",
  "#cccceeE0",
  "#eeccccE0",
  "#cceeccE0"
];
export let UserColors = {};
function assignColor() {
  let colors = BackColors;
  for (const ele in UserColors) {
    colors = colors.filter(clr => clr !== UserColors[ele]);
  }
  return colors[0];
}

const getUserListSuccess = (state, action) => {
  return {
    ...state,
    userList: action.userList
  };
};

const getUserListFail = (state, action) => {
  return {
    ...state,
    userListError: action.error
  };
};

const getSpecialUserSuccess = (state, action) => {
  return {
    ...state,
    specialUser: action.specialUser
  };
};

const getSpecialUserFail = (state, action) => {
  return {
    ...state,
    specialUserError: action.error
  };
};





const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MY_STREAM:
      return {
        ...state,
        myStream: action.stream
      };

    case actionTypes.GET_PHIZ_USER_PROFILE_SCCESS:
      return {
        ...state,
        phizUserProfile: action.payload
      };
    case actionTypes.PHIZ_USER_PROFILE_CLOSE:
      return {
        ...state,
        phizUserProfile: {}
      };
    case actionTypes.GET_MY_FRIENDSLIST_SUCCESS:
      return {
        ...state,
        myFriendsListFailmsg: "",
        myFriendsList: action.payload
      };

    case actionTypes.SHOW_USER_PROFILE_ACTION:
      return {
        ...state,
        userProfile: action.userProfile
      };
    case actionTypes.GET_MY_FRIENDSLIST_FAIL:
      return {
        ...state,
        myFriendsListFailmsg: action.payload
      };

    case actionTypes.GET_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload
      };
    case actionTypes.GET_USERLIST_SUCCESS:
      return getUserListSuccess(state, action);
    case actionTypes.GET_USERLIST_FAIL:
      return getUserListFail(state, action);
    case actionTypes.GET_SPECIAL_USER_SUCCESS:
      return getSpecialUserSuccess(state, action);
    case actionTypes.GET_SPECIAL_USER_FAIL:
      return getSpecialUserFail(state, action);
    case "user_add":
      if (state.find(user => user.id === action.value.id)) {
        console.log("Duplicate user error!");
        return state;
      }
      const color = assignColor();
      UserColors[action.value.id] = color;
      return [
        ...state,
        { ...action.value, color, media: { mic: "on", camera: "on" } }
      ];
    case "user_remove":
      delete UserColors[action.value.id];
      return state.filter(user => user.id !== action.value.id);
    case "user_media":
      return state.map(user => {
        if (user.id !== action.value.id) return user;
        if (action.value.type === "mic")
          return {
            ...user,
            media: { ...user.media, mic: action.value.status }
          };
        return {
          ...user,
          media: { ...user.media, camera: action.value.status }
        };
      });







    default:
      return state;
  }
};
export default user;
