import { API } from "../../config";
import { User } from "../../core/entities/user/user";

export function userTOJsonRes(user: User) {
    let ret = {};
    ret[API.USER.ID] = user.id;
    ret[API.USER.FIRST_NAME] = user.firstName;
    ret[API.USER.LAST_NAME] = user.lastName;
    ret[API.USER.EMAIL] = user.email;
    ret[API.USER.GENDER] = user.gender;
    ret[API.USER.PROFILE_IMAGE_URL] = user.profileImageUrl;
    ret[API.USER.CITY] = user.city;
    return ret;
}