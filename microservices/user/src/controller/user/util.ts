import { API } from "../../config";
import { User } from "../../core/entities/user/user";

export function userTOJsonRes(user: User) {
    let ret = {};
    ret[API.USER.ID_KEY_NAME] = user.id;
    ret[API.USER.FIRST_NAME_KEY_NAME] = user.firstName;
    ret[API.USER.LAST_NAME_KEY_NAME] = user.lastName;
    ret[API.USER.EMAIL_KEY_NAME] = user.email;
    ret[API.USER.GENDER_KEY_NAME] = user.gender;
    ret[API.USER.PROFILE_IMAGE_URL_KEY_NAME] = user.profileImageUrl;
    ret[API.USER.CITY_KEY_NAME] = user.city;
    return ret;
}
