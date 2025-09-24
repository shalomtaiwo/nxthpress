    import PostForm from '@/components/PostForm';
    import { createPost } from '../actions';

    export default function NewPostPage() {
    return (
        <div className="prose">
        <h1>New Post</h1>
        <PostForm formAction={createPost} submitLabel="Create" />
        </div>
    );
    }
