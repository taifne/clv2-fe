
import interceptor from "@/api/interceptor";
import axiosInstance from "@/api/interceptor"
import { requestApiHelper } from "@/helpers/request";
import { User } from "@/types/user"

class UserService {

    static async getUsers() {
        let love= await requestApiHelper<User[]>(
            interceptor.get("users")
        )
      
        return love;
    }



}

export default UserService