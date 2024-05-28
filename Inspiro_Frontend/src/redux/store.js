import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './actions/auth/loginAction';
import  registerSlice  from './actions/auth/registerAction';
import postSlice from './actions/posts/postActions'
import createPostSlice from './actions/posts/createPostActions'
import postDataSlice from './actions/posts/postDataActions'
import CommentSlice from './actions/posts/commentAction'
import CommentListsSlice from './actions/posts/commentListAction'
import userDataSlice from './actions/users/userDataActions'
import getUserDetailAction from './actions/users/singleUserActions'
import updateUserSlice from './actions/users/updateUserAction'
import verifyEmailSlice from './actions/auth/verifyEmailAction'
import resetPasswordEmailSlice from './actions/auth/resetPasswordEmailAction'
import updatePasswordSlice from './actions/auth/updatePasswordAction'
import deletePostSlice from './actions/posts/deletePostActions'

const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    post_create: createPostSlice,
    posts: postSlice,
    verify: verifyEmailSlice,
    post_data: postDataSlice,
    comments: CommentSlice,
    comments_lists: CommentListsSlice,
    user_data: userDataSlice,
    user_details: getUserDetailAction,
    user_update: updateUserSlice,
    reset_password: resetPasswordEmailSlice,
    update_password: updatePasswordSlice,
    post_delete: deletePostSlice,
  },
});

export default store;
