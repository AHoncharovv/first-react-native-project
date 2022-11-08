import {
    getAuth,
    updateProfile,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import firebaseApp from "../../firebase/config";
import { authSlice } from "./authReducer";

const auth = getAuth(firebaseApp)

const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log("error", error)
        console.log("error.message", error.message)
    } 
}

const authSignUpUser = ({email, password, nickname}) => async (dispatch, getState) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // const user = auth.currentUser
        // user.updateProfile({
        //     displayName: "Jane Q. User",
        // })
        await updateProfile(auth.currentUser, {
            displayName: nickname,
        })

        const updateUserSuccess = await getAuth(firebaseApp).currentUser
     
        dispatch(authSlice.actions.updateUserProfile({
            userId: updateUserSuccess.uid,
            nickname: updateUserSuccess.displayName,
        }))
       
    } catch (error) {
        console.log("error", error)
        console.log("error.message", error.message)
    }
}

const authSignOutUser = () => async (dispatch, getState) => {
    try { 
        await signOut(auth)
        dispatch(authSlice.actions.authSignOut())
    } catch (error) {
        console.log("error", error)
        console.log("error.message", error.message)
    }
}

const authStateChangeUser = () => async (dispatch, getState) => {
    try {
        await onAuthStateChanged(auth, (user) => { 
            if (user) {
                dispatch(authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickname: user.displayName,
                }))
                dispatch(authSlice.actions.authStateChange({ stateChange: true }))
            }
        })
    } catch (error) {
        console.log("error", error)
        console.log("error.message", error.message)
    }
}

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser }