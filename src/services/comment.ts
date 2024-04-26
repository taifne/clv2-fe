import interceptor from "@/api/interceptor";
import { Comment, CommentCreate, CommentData, CommentUpdate } from "@/types/comment";
import { requestApiHelper } from "@/helpers/request";

class CommentService {
    static async getCommentsByPostId(id: number): Promise<CommentData | null> {
        try {
            const response = await interceptor.get(`/comments/post/${id}`);
          
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }
    
    static async createAComment(data:Partial<CommentCreate>): Promise<CommentData | null> {
        try {
            
            const response = await interceptor.post(`/comments`,data);
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }
    
    static async deleteMyComment(id: number): Promise<CommentData | null> {
        try {
            const response = await interceptor.delete(`/comments/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }
    static async likeComment(data:Partial<CommentUpdate>): Promise<CommentData | null> {
        try {
            const response = await interceptor.patch(`/comments/${data.Id}`,data);
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }
}

export default CommentService;
